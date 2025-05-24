// Admin.tsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

// Import individual admin components
import LeadsManager from './LeadsManager';
import MessagesManager from './MessagesManager';
import PagesManager from './PagesManager';
import ServicesManager from './ServicesManager';
import FormsManager from './FormsManager';
import AdminDashboard from './AdminDashboard';
import ContentManager from './ContentManager';
import TranslationsManager from './TranslationsManager';

const Admin: React.FC = () => {
  // Use the useAuth hook to access auth context
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const isRtl = i18n.language === 'he';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode class to document body
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Main content area with routes */}
      <div className="w-full">
        <Routes>
          <Route path="" element={<AdminDashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="/content" element={<ContentManager darkMode={darkMode} />} />
          <Route path="/leads" element={<LeadsManager darkMode={darkMode} />} />
          <Route path="/messages" element={<MessagesManager darkMode={darkMode} />} />
          <Route path="/pages" element={<PagesManager darkMode={darkMode} />} />
          <Route path="/services" element={<ServicesManager darkMode={darkMode} />} />
          <Route path="/forms" element={<FormsManager darkMode={darkMode} />} />
          <Route path="/translations" element={<TranslationsManager darkMode={darkMode} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
