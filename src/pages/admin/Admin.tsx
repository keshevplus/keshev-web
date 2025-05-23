// Admin.tsx

import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

// Import individual admin components
import LeadsManager from './LeadsManager';
import MessagesManager from './MessagesManager';
import PagesManager from './PagesManager';
import ServicesManager from './ServicesManager';
import FormsManager from './FormsManager';
import AdminDashboard from './AdminDashboard';
import ContentManager from './ContentManager';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import TranslationsManager from './TranslationsManager';

const Admin: React.FC = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const isRtl = i18n.language === 'he';

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/admin/login');
    }
  }, [auth, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode class to document body
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} flex`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Mobile hamburger button */}
      <button
        className={`lg:hidden fixed z-20 p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg ${isRtl ? 'right-5' : 'left-5'} top-5`}
        onClick={toggleMobileMenu}
        aria-label={t('admin.menu')}
      >
        {mobileMenuOpen ? (
          // X icon for closing
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Sidebar - positioned based on language direction and responsive */}
      <div className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} z-10 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        mobileMenuOpen 
          ? 'translate-x-0' 
          : isRtl 
            ? 'translate-x-full' 
            : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header section with language switcher and theme toggle */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              <Link to="/admin" className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {t('admin.admin_panel')}
              </Link>
              
              <div className="flex items-center space-x-2">
                {/* Show language switcher first in RTL mode */}
                {isRtl && <LanguageSwitcher />}
                
                {/* Light/Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className={`${darkMode ? 'text-yellow-300 hover:text-yellow-100' : 'text-gray-600 hover:text-gray-800'} p-2 rounded-full focus:outline-none`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                      <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-current">
                      <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                    </svg>
                  )}
                </button>
                
                {/* Show language switcher after toggle in LTR mode */}
                {!isRtl && <LanguageSwitcher />}
              </div>
            </div>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-1">
              <Link
                to="/admin"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {t('admin.dashboard')}
              </Link>
              <Link
                to="/admin/content"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Content
              </Link>
              <Link
                to="/admin/translations"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Translations
              </Link>
              <Link
                to="/admin/leads"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Leads
              </Link>
              <Link
                to="/admin/messages"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Messages
              </Link>
              <Link
                to="/admin/pages"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Pages
              </Link>
              <Link
                to="/admin/services"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Services
              </Link>
              <Link
                to="/admin/forms"
                className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Forms
              </Link>
            </div>
          </nav>
          
          {/* User info and logout at bottom of sidebar */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {auth.user?.username || 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {t('navigation.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - with responsive padding */}
      <div className={`flex-1 p-6 transition-all duration-300 ${
        // On large screens, always use margin
        // On small screens, only use margin when menu is open
        mobileMenuOpen
          ? isRtl ? 'mr-64' : 'ml-64'  // Mobile with open menu
          : isRtl 
            ? 'lg:mr-64' : 'lg:ml-64'  // Desktop or mobile with closed menu
      }`}>
        <Routes>
          <Route path="/" element={<AdminDashboard darkMode={darkMode} />} />
          <Route path="/content" element={<ContentManager darkMode={darkMode} />} />
          <Route path="/translations" element={<TranslationsManager />} />
          <Route path="/leads" element={<LeadsManager darkMode={darkMode} />} />
          <Route path="/messages" element={<MessagesManager darkMode={darkMode} />} />
          <Route path="/pages" element={<PagesManager darkMode={darkMode} />} />
          <Route path="/services" element={<ServicesManager darkMode={darkMode} />} />
          <Route path="/forms" element={<FormsManager darkMode={darkMode} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
