// Admin.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiX, FiLogOut, FiMoon, FiSun, FiHome, FiFileText, FiMessageSquare, FiUsers, FiSettings, FiGlobe, FiLayout } from 'react-icons/fi';

// Import with lazy loading for code splitting
import { lazy, Suspense } from 'react';
import SafeAdminComponentWrapper from '../../components/admin/SafeAdminComponentWrapper';

// Lazy load admin components for better performance and isolation
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const ContentManager = lazy(() => import('./ContentManager'));
// const MessagesManager = lazy(() => import('./MessagesManager'));
const MessagesManager = lazy(() => import('./MessagesManager'));
const PagesManager = lazy(() => import('./PagesManager'));
const ServicesManager = lazy(() => import('./ServicesManager'));
const FormsManager = lazy(() => import('./FormsManager'));
const TranslationsManager = lazy(() => import('./TranslationsManager'));

// Define a loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-full p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Define navigation item structure
interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

// We're using SafeAdminComponentWrapper to isolate admin components from the frontend

const Admin: React.FC = () => {
  // Use the useAuth hook to access auth context
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isRtl = i18n.language === 'he';

  // Navigation items for the admin menu
  const navItems: NavItem[] = [
    { title: t('admin.dashboard', 'Dashboard'), path: '/admin', icon: <FiHome size={16} /> },
    { title: t('admin.pages', 'Pages'), path: '/admin/pages', icon: <FiLayout size={16} /> },
    { title: t('admin.services', 'Services'), path: '/admin/services', icon: <FiSettings size={16} /> },
    { title: t('admin.messages', 'Messages'), path: '/admin/messages', icon: <FiMessageSquare size={16} /> },
    // { title: t('admin.messages', 'Messages'), path: '/admin/messages', icon: <FiUsers size={16} /> },
    { title: t('admin.forms', 'Forms'), path: '/admin/forms', icon: <FiFileText size={16} /> },
    { title: t('admin.translations', 'Translations'), path: '/admin/translations', icon: <FiGlobe size={16} /> }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode class to document body
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Mobile menu button - only visible on mobile */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="mr-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            onClick={handleLogout}
            className="p-2 ml-2 text-red-500 rounded-md focus:outline-none"
            aria-label="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed inset-y-0 left-0 z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400">
            <FiX size={20} />
          </button>
        </div>

        <nav className="mt-4">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center w-full px-4 py-2 text-left ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop layout */}
      <div className="flex">
        {/* Desktop sidebar - hidden on mobile */}
        <div className="hidden lg:block w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 h-screen">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Admin Panel</h2>
          </div>

          <nav className="mt-4">
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-0  border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md focus:outline-none"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-red-500 rounded-md focus:outline-none flex items-center"
              >
                <FiLogOut size={18} className="mr-1" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content area with routes */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="" element={
              <Suspense fallback={<LoadingFallback />}>
                <SafeAdminComponentWrapper
                  component={AdminDashboard}
                  featureFlag="dashboard"
                  componentProps={{ darkMode, toggleDarkMode }}
                />
              </Suspense>
            } />
            <Route path="/content" element={
              <Suspense fallback={<LoadingFallback />}>
                <SafeAdminComponentWrapper
                  component={ContentManager}
                  featureFlag="content"
                  componentProps={{ darkMode }}
                />
              </Suspense>
            } />
            <Route path="/messages" element={
              <Suspense fallback={<LoadingFallback />}>
                <SafeAdminComponentWrapper
                  component={MessagesManager}
                  featureFlag="messages"
                  componentProps={{ darkMode }}
                />
              </Suspense>
            } />
            <Route path="/messages" element={
              <Suspense fallback={<LoadingFallback />}>
                <SafeAdminComponentWrapper
                  component={MessagesManager}
                  featureFlag="messages"
                  componentProps={{ darkMode }}
                />
              </Suspense>
            } />
            <Route path="/pages" element={
              <Suspense fallback={<LoadingFallback />}>
                <SafeAdminComponentWrapper
                  component={PagesManager}
                  featureFlag="content"
                  componentProps={{ darkMode }}
                />
              </Suspense>
            } />
            <Route path="/services" element={
              <Suspense fallback={<LoadingFallback />}>
                <SafeAdminComponentWrapper
                  component={ServicesManager}
                  featureFlag="content"
                  componentProps={{ darkMode }}
                />
              </Suspense>
            } />
            <Route path="/forms" element={
              <Suspense fallback={<LoadingFallback />}>
                <SafeAdminComponentWrapper
                  component={FormsManager}
                  featureFlag="content"
                  componentProps={{ darkMode }}
                />
              </Suspense>
            } />
            <Route path="/translations" element={
              <Suspense fallback={<LoadingFallback />}>
                <SafeAdminComponentWrapper
                  component={TranslationsManager}
                  featureFlag="content"
                  componentProps={{ darkMode }}
                />
              </Suspense>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
