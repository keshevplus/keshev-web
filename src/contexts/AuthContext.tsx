import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password_hash?: string) => Promise<any>;
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

  const login = async (email: string, password_hash?: string) => {
    try {
      const devAdminEmail = import.meta.env.VITE_DEV_ADMIN_EMAIL;
      const masterAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'dr@keshevplus.co.il';
      const masterAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      let effectiveEmail = email;
      let effectivePassword = password_hash;
      let isDevAdminShortcut = false;

      // Check if this is a dev admin passwordless login attempt
      if (devAdminEmail && email === devAdminEmail && password_hash === undefined) {
        console.log('Detected passwordless Dev Admin login attempt');
        
        // DIRECT PASSWORDLESS LOGIN - No need to call the API
        // Create a mock JWT token (only for development)
        const mockToken = `dev.admin.${Date.now()}`;
        const mockUser = {
          id: 999,
          username: 'Development Admin',
          email: devAdminEmail,
          role: 'admin'
        };
        
        console.log('Created mock dev admin session:', { user: mockUser });
        
        // Set token and user in state/localStorage
        setToken(mockToken);
        setUser(mockUser);
        
        // Return early with success
        return { token: mockToken, user: mockUser };
      } else if (password_hash === undefined) {
        // Standard login path requires a password if not the dev admin shortcut
        throw new Error('Password is required for standard login.');
      }

      // Common API login logic
      const loginUrl = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/auth/login` : '';
      if (!loginUrl) {
        throw new Error('API base URL (VITE_API_BASE_URL) is not configured.');
      }

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: effectiveEmail, password_hash: effectivePassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        // If dev admin shortcut login failed, provide a specific error
        if (isDevAdminShortcut) {
          throw new Error(`Dev Admin shortcut failed: API login with master credentials (${masterAdminEmail}) failed. API Error: ${data.message || 'Login failed.'}`);
        }
        throw new Error(data.message || 'Login failed.');
      }

      // Successfully logged in (either normally or via dev admin shortcut using master creds)
      setToken(data.token); // This is now a REAL token from the API
      
      // If it was the dev admin shortcut, we might want to set a specific user object for frontend identification
      if (isDevAdminShortcut) {
        setUser({ 
          id: data.user?.id || 0, // Use backend user id if available
          username: data.user?.username || 'Dev Admin (as Master)', 
          email: masterAdminEmail, // The email used for the actual login
          role: data.user?.role || 'admin' 
        });
      } else {
        setUser(data.user); // User object from the API for normal login
      }
      
      return { token: data.token, user: data.user };

    } catch (error: any) {
      // Clear any potentially partially set auth state on error
      // logout(); // Consider if this is too aggressive or if error boundary handles display
      console.error('Login process failed:', error);
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
