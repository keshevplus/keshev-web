import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  id: number;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  token: string | null;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token && !!user);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [token, user]);

  const login = async (email: string, password: string) => {
    try {
      // Check if we're in development environment or Vercel preview/production with API issues
      const isApiAvailable = import.meta.env.DEV;
      
      // Get admin credentials from environment variables or use defaults
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@keshev.org.il';
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123456';
      
      // Skip API call if we know it's not available or having issues
      if (!isApiAvailable || window.location.hostname.includes('vercel.app')) {
        console.log('Using local authentication fallback');
        
        // Simple local authentication check
        if (email === adminEmail && password === adminPassword) {
          const mockToken = 'local-auth-token-' + Date.now();
          const mockUser = {
            username: email.split('@')[0],
            id: 1,
            role: 'admin'
          };
          
          setToken(mockToken);
          setUser(mockUser);
          
          return { token: mockToken, user: mockUser };
        } else {
          throw new Error('Invalid email or password');
        }
      }
      
      // Regular API authentication (only used in environments where the API is available)
      console.log('Making API request to /api/auth/login');
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        // Safely try to parse the response
        let errorData = { message: 'Unknown error occurred' };
        let responseText;
        
        try {
          responseText = await response.text();
          if (responseText) {
            try {
              errorData = JSON.parse(responseText);
            } catch (parseError) {
              console.error('Failed to parse response as JSON:', responseText);
              errorData.message = 'Server returned invalid JSON response';
              
              // Fall back to local auth if API is failing
              return await login(email, password);
            }
          }
        } catch (textError) {
          console.error('Failed to read response text:', textError);
          // Fall back to local auth if API is failing
          return await login(email, password);
        }

        if (!response.ok) {
          // Fall back to local auth on API failure
          if (response.status === 405) {
            console.log('API route not available (405 error), falling back to local auth');
            return await login(email, password);
          }
          throw new Error(errorData.message || `Login failed with status ${response.status}`);
        }

        // If we got here, we have a valid JSON response
        const data = responseText ? JSON.parse(responseText) : {};
        console.log('Login response:', data); // Log response for debugging
        
        if (!data.token) {
          throw new Error('No token received from server');
        }
        
        setToken(data.token);
        setUser(data.user || { // Fallback if server doesn't provide user
          username: email.split('@')[0],
          id: 1, 
          role: 'admin'
        });
        
        return data;
      } catch (apiError) {
        console.error('API login error:', apiError);
        
        // Fall back to local auth on API failure
        if (email === adminEmail && password === adminPassword) {
          console.log('Falling back to local authentication after API failure');
          const mockToken = 'local-auth-token-' + Date.now();
          const mockUser = {
            username: email.split('@')[0],
            id: 1,
            role: 'admin'
          };
          
          setToken(mockToken);
          setUser(mockUser);
          
          return { token: mockToken, user: mockUser };
        } else {
          throw new Error('Invalid email or password');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export type { AuthContextType, User };
