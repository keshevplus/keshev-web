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
      console.log('Making API request to /api/auth/login');
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
          }
        }
      } catch (textError) {
        console.error('Failed to read response text:', textError);
      }

      if (!response.ok) {
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
