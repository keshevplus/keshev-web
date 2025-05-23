// AdminDashboard.tsx

import React, { useEffect, useState, useRef } from 'react';
import { pagesService, servicesService, formsService, messagesService, leadsService } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { FiRefreshCw, FiAlertTriangle, FiCheckCircle, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiMessageSquare, FiUsers, FiSettings, FiGlobe, FiLayout } from 'react-icons/fi';

interface AdminDashboardProps {
  darkMode?: boolean;
}

type ResourceStatus = 'idle' | 'loading' | 'success' | 'error';

interface ResourceState {
  status: ResourceStatus;
  count: number;
  error: string | null;
  lastUpdated: Date | null;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode = false }) => {
  const [resources, setResources] = useState({
    pages: { status: 'idle' as ResourceStatus, count: 0, error: null, lastUpdated: null },
    services: { status: 'idle' as ResourceStatus, count: 0, error: null, lastUpdated: null },
    forms: { status: 'idle' as ResourceStatus, count: 0, error: null, lastUpdated: null },
    messages: { status: 'idle' as ResourceStatus, count: 0, error: null, lastUpdated: null },
    leads: { status: 'idle' as ResourceStatus, count: 0, error: null, lastUpdated: null }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'he';

  // Navigation items for the mobile menu - slim and compact
  const navItems: NavItem[] = [
    { title: t('admin.dashboard', 'Dashboard'), path: '/admin', icon: <FiHome size={16} /> },
    { title: t('admin.pages', 'Pages'), path: '/admin/pages', icon: <FiLayout size={16} /> },
    { title: t('admin.services', 'Services'), path: '/admin/services', icon: <FiSettings size={16} /> },
    { title: t('admin.messages', 'Messages'), path: '/admin/messages', icon: <FiMessageSquare size={16} /> },
    { title: t('admin.leads', 'Leads'), path: '/admin/leads', icon: <FiUsers size={16} /> },
    { title: t('admin.forms', 'Forms'), path: '/admin/forms', icon: <FiFileText size={16} /> },
    { title: t('admin.translations', 'Translations'), path: '/admin/translations', icon: <FiGlobe size={16} /> }
  ];

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

  // Fetch all statistics
  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);
        
        const [pagesRes, servicesRes, formsRes, messagesRes, leadsRes] = await Promise.all([
          pagesService.getAllPages(),
          servicesService.getAllServices(),
          formsService.getAllForms(),
          messagesService.getAllMessages(),
          leadsService.getAllLeads(),
        ]);

        setResources({
          pages: { status: 'success', count: pagesRes.length, error: null, lastUpdated: new Date() },
          services: { status: 'success', count: servicesRes.length, error: null, lastUpdated: new Date() },
          forms: { status: 'success', count: formsRes.length, error: null, lastUpdated: new Date() },
          messages: { status: 'success', count: messagesRes?.messages?.length || 0, error: null, lastUpdated: new Date() },
          leads: { status: 'success', count: leadsRes?.leads?.length || 0, error: null, lastUpdated: new Date() }
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Navigate to different admin sections
  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Mobile Hamburger Button - Only visible on mobile/tablet */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden fixed z-30 top-4 ${isRtl ? 'left-4' : 'right-4'} w-8 h-8 flex items-center justify-center rounded-full ${
          darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
        } shadow-lg focus:outline-none transition-all duration-200`}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
      </button>

      {/* Mobile Menu - Slim and Modern */}
      <div
        ref={menuRef}
        className={`fixed z-20 top-0 ${isRtl ? 'right-0' : 'left-0'} h-full w-44 md:hidden ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'translate-x-0' 
            : isRtl 
              ? 'translate-x-full' 
              : '-translate-x-full'
        }`}
      >
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold truncate">
            {t('admin.admin_panel', 'Admin Panel')}
          </h3>
        </div>
        
        <nav className="py-2">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full text-left flex items-center px-3 py-2 text-xs ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="truncate">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content - With proper spacing for mobile menu */}
      <div className={`p-4 ${mobileMenuOpen ? 'md:ml-0 ml-44' : 'ml-0'} transition-all duration-300`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {t('admin.dashboard', 'Dashboard')}
          </h1>
          
          <button
            onClick={() => window.location.reload()}
            className={`hidden md:flex items-center text-sm px-3 py-1 rounded ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-colors duration-200`}
          >
            <FiRefreshCw size={14} className="mr-1" />
            {t('admin.refresh', 'Refresh')}
          </button>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm" role="alert">
            <div className="flex items-center">
              <FiAlertTriangle className="mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin h-8 w-8 border-4 border-t-green-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className="text-sm font-medium mb-1">Pages</h3>
              <p className="text-2xl font-bold">{resources.pages.count}</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className="text-sm font-medium mb-1">Services</h3>
              <p className="text-2xl font-bold">{resources.services.count}</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className="text-sm font-medium mb-1">Forms</h3>
              <p className="text-2xl font-bold">{resources.forms.count}</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className="text-sm font-medium mb-1">Messages</h3>
              <p className="text-2xl font-bold">{resources.messages.count}</p>
            </div>
            
            <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className="text-sm font-medium mb-1">Leads</h3>
              <p className="text-2xl font-bold">{resources.leads.count}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
