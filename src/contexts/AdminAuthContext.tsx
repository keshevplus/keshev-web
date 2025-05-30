import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Create a default context value to prevent errors when used without provider
const defaultContextValue: AdminAuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => { 
    console.error('AdminAuthProvider not available'); 
    throw new Error('AdminAuthProvider not available');
  },
  logout: () => { console.error('AdminAuthProvider not available'); },
  loading: false
};

const AdminAuthContext = createContext<AdminAuthContextType>(defaultContextValue);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  return context;
}

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  
  const isProduction = import.meta.env.PROD;
  const apiBaseUrl = isProduction
    ? (import.meta.env.VITE_API_BASE_URL || 'https://api.keshevplus.co.il')
    : 'http://localhost:3001';

  // Check for existing auth on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Try to verify the token
        const response = await axios.get(`${apiBaseUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser(response.data.user);
      } catch (err) {
        console.error('Token verification failed:', err);
        // Token invalid, clear auth state
        localStorage.removeItem('adminToken');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, apiBaseUrl]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // First attempt without /api prefix
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, { email, password });
      
      const { token: newToken, user: userData } = response.data;
      
      // Store token and update state
      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
      setUser(userData);
      console.log('Admin login successful:', userData);
      return;
    } catch (err) {
      console.log('First login attempt failed, trying with /api prefix');
      
      // Try with /api prefix as fallback
      try {
        const fallbackResponse = await axios.post(`${apiBaseUrl}/api/auth/login`, { 
          email, 
          password 
        });
        
        const { token: newToken, user: userData } = fallbackResponse.data;
        
        // Store token and update state
        localStorage.setItem('adminToken', newToken);
        setToken(newToken);
        setUser(userData);
        console.log('Admin login successful (fallback):', userData);
        return;
      } catch (fallbackErr) {
        console.error('Both login attempts failed');
        throw new Error('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setUser(null);
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    loading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
