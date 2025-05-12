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
      // Check if VITE_DATABASE_URL is present
      const hasDatabaseUrl = !!import.meta.env.VITE_DATABASE_URL;
      if (!hasDatabaseUrl) {
        throw new Error('Database is not configured. Please contact the administrator.');
      }

      // Get admin credentials from environment variables or use defaults
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'dr@keshevplus.co.il';
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'changeme123';

      // Regular API authentication
      console.log('Making API request to VITE_API_BASE_URL/auth/login');
      try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Login failed.');
        }
        setToken(data.token);
        setUser(data.user);
        return { token: data.token, user: data.user };
      } catch (error: any) {
        throw new Error(error.message || 'API login failed.');
      }
    } catch (error: any) {
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
