import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Don't import API_BASE_URL since we're using direct connection for login

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
    console.log('[Auth] Effect triggered with token:', token ? `${token.substring(0, 10)}...` : 'none');
    console.log('[Auth] User state:', user ? `${user.username} (${user.email})` : 'none');
    
    if (token && user) {
      console.log('[Auth] Saving authentication state to localStorage');
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      console.log('[Auth] Clearing authentication state - missing token or user');
      console.log('[Auth] Token present:', !!token);
      console.log('[Auth] User present:', !!user);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [token, user]);

  const login = async (email: string, password_hash?: string) => {
    try {
      // Always have fallback values in case env vars aren't loaded
      const devAdminEmail = import.meta.env.VITE_DEV_ADMIN_EMAIL || 'simple.admin@keshevplus.co.il';
      const masterAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'dr@keshevplus.co.il';
      const adminPassword = 'changeme'; // Hardcoded admin password
      
      // IMPORTANT: Add direct admin access without API call
      if (email === masterAdminEmail && password_hash === adminPassword) {
        console.log('Direct admin access granted!');
        
        // Create a stable token that won't expire
        const token = 'admin-token-keshevplus-' + Date.now();
        
        // Create admin user object
        const adminUser = {
          id: 1,
          username: 'Admin',
          email: masterAdminEmail,
          role: 'admin'
        };
        
        // Set token and user directly
        setToken(token);
        setUser(adminUser);
        
        // Save to localStorage for persistence
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(adminUser));
        
        return { token, user: adminUser };
      }

      let effectiveEmail = email;
      let effectivePassword = password_hash;
      let isDevAdminShortcut = false;

      // Check if this is a dev admin passwordless login attempt
      if (devAdminEmail && email === devAdminEmail && (!password_hash || password_hash === '')) {
        console.log('Detected passwordless Dev Admin login attempt');
        
        // DIRECT PASSWORDLESS LOGIN - No need to call the API
        // Create a stable token that won't change
        const mockToken = 'dev-admin-token-stable';
        const mockUser = {
          id: 999,
          username: 'Development Admin',
          email: devAdminEmail,
          role: 'admin'
        };
        
        console.log('Created stable dev admin session:', { user: mockUser });
        
        // Set token and user in state AND localStorage for persistence
        setToken(mockToken);
        setUser(mockUser);
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        console.log('Saved dev admin credentials to localStorage');
        
        // Return early with success
        return { token: mockToken, user: mockUser };
      } else if ((password_hash === undefined || password_hash === '') && email !== devAdminEmail) {
        // Standard login path requires a password if not the dev admin shortcut
        throw new Error('Password is required for standard login.');
      }

      // For login, always use the production API directly to avoid proxy issues
      // This ensures consistent login behavior in all environments
      const prodApiBase = 'https://api.keshevplus.co.il/api';
      const loginUrl = `${prodApiBase}/auth/login`;
      console.log('Using direct production login URL:', loginUrl);
      
      // Log detailed auth attempt info
      console.log('Login attempt details:', {
        email: effectiveEmail,
        passwordProvided: !!effectivePassword,
        passwordLength: effectivePassword ? effectivePassword.length : 0,
        loginUrl
      });
      
      console.log('Attempting standard login with:', { 
        email: effectiveEmail,
        hasPassword: !!effectivePassword,
        loginUrl
      });

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: effectiveEmail, password_hash: effectivePassword }),
      });
      
      console.log('Login response status:', response.status);

      console.log('Attempting to parse login response data');
      let data;
      try {
        data = await response.json();
        console.log('Login response data:', data);
      } catch (e) {
        console.error('Error parsing login response JSON:', e);
        throw new Error('Failed to parse login response. The API endpoint may not be responding correctly.');
      }
      
      if (!response.ok) {
        // If dev admin shortcut login failed, provide a specific error
        console.error('Login failed with status:', response.status, 'Response data:', data);
        if (isDevAdminShortcut) {
          throw new Error(`Dev Admin shortcut failed: API login with master credentials (${masterAdminEmail}) failed. API Error: ${data?.message || 'Login failed.'}`);
        }
        throw new Error(data?.message || `Login failed with status ${response.status}`);
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
