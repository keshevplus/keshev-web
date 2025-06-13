// filepath: c:\KESHEVPLUS\20250601\keshev-web\src\contexts\AdminContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface AdminContextType {
    isEditMode: boolean;
    toggleEditMode: () => void;
    isAdminRoute: boolean;
    isAdmin: boolean; // Add the missing isAdmin property
}

const AdminContext = createContext<AdminContextType>({
    isEditMode: false,
    toggleEditMode: () => { },
    isAdminRoute: false,
    isAdmin: false, // Add default value
});

export const useAdmin = () => useContext(AdminContext);

interface AdminProviderProps {
    children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const { user } = useAuth();
    const location = useLocation();

    // Check if current route is an admin route
    const isAdminRoute = location.pathname.startsWith('/admin');

    // Determine if user has admin privileges
    const isAdmin = user?.role === 'admin';

    // Toggle edit mode - only works if user is authenticated
    const toggleEditMode = () => {
        if (user) {
            setIsEditMode(prev => !prev);
        }
    };

    return (
        <AdminContext.Provider
            value={{
                isEditMode,
                toggleEditMode,
                isAdminRoute,
                isAdmin // Add the isAdmin property to the context value
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};