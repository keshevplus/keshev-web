// AdminDashboard.tsx

import React, { useEffect, useState, useRef } from 'react';
import { pagesService, servicesService, formsService, messagesService } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { FiRefreshCw, FiAlertTriangle, FiMenu, FiX, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiUsers, FiSettings, FiGlobe, FiLayout } from 'react-icons/fi';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import { useAuth } from '../../contexts/AuthContext';
import { messagesService as messagesServiceNew } from '../../services/messages-api-new';

interface AdminDashboardProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

type ResourceStatus = 'idle' | 'loading' | 'success' | 'error';

interface ResourceState {
  status: ResourceStatus;
  count: number;
  unreadCount: number;
  error: string | null;
  lastUpdated: Date;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface Message {
  id: string;
  name: string;
  subject: string;
  is_read: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode = false, toggleDarkMode }) => {
  const [resources, setResources] = useState<{
    pages: ResourceState;
    services: ResourceState;
    forms: ResourceState;
    messages: ResourceState;
  }>({
    pages: { status: 'idle', count: 0, unreadCount: 0, error: null, lastUpdated: new Date() },
    services: { status: 'idle', count: 0, unreadCount: 0, error: null, lastUpdated: new Date() },
    forms: { status: 'idle', count: 0, unreadCount: 0, error: null, lastUpdated: new Date() },
    messages: { status: 'idle', count: 0, unreadCount: 0, error: null, lastUpdated: new Date() },
  });
  const [messageCount, setMessageCount] = useState(0);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isRtl = i18n.language === 'he';

  const [messages, setMessages] = useState<Message[]>([]);
  const [msgsLoading, setMsgsLoading] = useState(false);

  // Timer ref for periodic message checking
  const messageCheckIntervalRef = useRef<number | null>(null);

  // Navigation items for the mobile menu - slim and compact
  const navItems: NavItem[] = [
    { title: t('admin.dashboard', 'Dashboard'), path: '/admin', icon: <FiHome size={16} /> },
    { title: t('admin.pages', 'Pages'), path: '/admin/pages', icon: <FiLayout size={16} /> },
    { title: t('admin.services', 'Services'), path: '/admin/services', icon: <FiSettings size={16} /> },
    { title: t('admin.messages', 'Messages'), path: '/admin/messages', icon: <FiUsers size={16} /> },
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

  // Set up periodic message checking
  useEffect(() => {
    // Initial check
    checkForNewMessages();

    // Set up interval for checking new messages (every 30 seconds)
    const intervalId = window.setInterval(() => {
      checkForNewMessages();
    }, 30000);

    messageCheckIntervalRef.current = intervalId;

    // Clean up on unmount
    return () => {
      if (messageCheckIntervalRef.current) {
        window.clearInterval(messageCheckIntervalRef.current);
      }
    };
  }, []);

  // Function to check for new messages
  const checkForNewMessages = async () => {
    try {
      const messagesRes = await messagesService.getAllMessages();
      const newCount = messagesRes?.messages?.length || 0;

      // If we already had a count and the new count is higher, we have new messages
      if (messageCount > 0 && newCount > messageCount) {
        setNewMessagesCount(newCount - messageCount);
      }

      // Update the message count
      setMessageCount(newCount);
    } catch (error) {
      console.error('Error checking for new messages:', error);
    }
  };

  // Fetch all statistics
  useEffect(() => {
    const loadStats = async () => {
      await fetchStats();
    };
    loadStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching stats for dashboard...');

      // Using Promise.allSettled to prevent one failure from blocking all results
      const results = await Promise.allSettled([
        pagesService.getAllPages(),
        servicesService.getAllServices(),
        formsService.getAllForms(),
        messagesService.getAllMessages(),
      ]);

      console.log('Stats fetch results:', results);

      // Extract results safely
      const [pagesResult, servicesResult, formsResult, messagesResult] = results;

      // Get data from successful requests or use fallbacks for failed ones
      const pagesRes = pagesResult.status === 'fulfilled' ? (pagesResult.value as { length: number }) : { length: 0 };
      const servicesRes = servicesResult.status === 'fulfilled' ? servicesResult.value : [];
      const formsRes = formsResult.status === 'fulfilled' ? formsResult.value : [];
      const messagesRes = messagesResult.status === 'fulfilled' ? messagesResult.value : { messages: [] };

      console.log('Messages response:', messagesRes);

      // Update message count for notification badge
      const newMessageCount = messagesRes?.messages?.length || 0;
      console.log('New message count:', newMessageCount);
      setMessageCount(newMessageCount);

      // Check for unread messages and messages
      const unreadMessages = messagesRes?.messages?.filter((message: { is_read?: boolean }) => !message.is_read)?.length || 0;
      console.log('Unread messages:', unreadMessages);
      setNewMessagesCount(unreadMessages);

      setResources({
        pages: { status: 'success', count: (pagesRes?.length || 0), unreadCount: 0, error: null, lastUpdated: new Date() },
        services: { status: 'success', count: Array.isArray(servicesRes) ? servicesRes.length : 0, unreadCount: 0, error: null, lastUpdated: new Date() },
        forms: { status: 'success', count: Array.isArray(formsRes) ? formsRes.length : 0, unreadCount: 0, error: null, lastUpdated: new Date() },
        messages: { status: 'success', count: messagesRes?.messages?.length || 0, unreadCount: unreadMessages, error: null, lastUpdated: new Date() }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function fetchMessages() {
    setMsgsLoading(true);
    try {
      const res = await messagesServiceNew.getAllMessages(1, 5, '');
      setMessages(res.messages);
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setMsgsLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  // Navigate to different admin sections
  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);

    // If navigating to messages, reset the new messages counter
    if (path === '/admin/messages') {
      setNewMessagesCount(0);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="relative">
      {/* Mobile Hamburger Button - Only visible on mobile/tablet */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden fixed z-30 top-4 ${isRtl ? 'left-4' : 'left-4'} w-8 h-8 flex items-center justify-center rounded-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
          } shadow-lg focus:outline-none transition-all duration-200`}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
      </button>

      {/* Mobile Menu - Slim and Modern */}
      <div
        ref={menuRef}
        className={`fixed z-20 top-0 left-0 h-full w-44 md:hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          } shadow-lg transform transition-transform duration-300 ease-in-out ${mobileMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full'
          }`}
      >
        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiX size={20} />
          </button>
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
                  className={`w-full text-left flex items-center justify-between px-3 py-2 text-xs ${darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                    } transition-colors duration-200`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span className="truncate">{item.title}</span>
                  </div>

                  {/* Badge for new messages */}
                  {item.path === '/admin/messages' && newMessagesCount > 0 && (
                    <span className="flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 ml-2">
                      {newMessagesCount > 9 ? '9+' : newMessagesCount}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="border-t border-gray-200 my-3"></div>

          {/* Admin, Logout, Dark Mode Toggle, Language Switcher */}
          <ul>
            {/* Admin section */}
            <li>
              <div className="px-3 py-2 text-xs text-gray-500">
                {t('admin.admin', 'Admin')}
              </div>
            </li>

            {/* Logout button */}
            <li>
              <button
                onClick={handleLogout}
                className={`w-full text-left flex items-center px-3 py-2 text-xs ${darkMode
                  ? 'hover:bg-gray-700 text-red-400 hover:text-red-300'
                  : 'hover:bg-gray-100 text-red-600 hover:text-red-700'
                  } transition-colors duration-200`}
              >
                <span className="mr-3"><FiLogOut size={16} /></span>
                <span className="truncate">{t('navigation.logout', 'Logout')}</span>
              </button>
            </li>

            {/* Dark Mode Toggle */}
            <li>
              <button
                onClick={toggleDarkMode}
                className={`w-full text-left flex items-center px-3 py-2 text-xs ${darkMode
                  ? 'hover:bg-gray-700 text-yellow-300'
                  : 'hover:bg-gray-100 text-gray-600'
                  } transition-colors duration-200`}
              >
                <span className="mr-3">{darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}</span>
                <span className="truncate">{darkMode ? t('admin.light_mode', 'Light Mode') : t('admin.dark_mode', 'Dark Mode')}</span>
              </button>
            </li>

            {/* Language Switcher */}
            <li className="px-3 py-2">
              <div className="flex items-center">
                <span className="mr-3"><FiGlobe size={16} /></span>
                <span className="truncate text-xs mr-2">{t('admin.language', 'Language')}:</span>
                <LanguageSwitcher />
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content - With proper spacing for mobile menu and 100px top margin */}
      <div className={`p-4 mt-[100px] ${mobileMenuOpen ? 'md:ml-0 ml-44' : 'ml-0'} transition-all duration-300`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {t('admin.dashboard', 'ניהול לקוחות ותוכן')}
            </h1>
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              NeonDB: keshevplus_production
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className={`hidden md:flex items-center text-sm px-3 py-1 rounded ${darkMode
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
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <code>pages</code> table
              </p>
            </div>

            <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className="text-sm font-medium mb-1">Services</h3>
              <p className="text-2xl font-bold">{resources.services.count}</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <code>services</code> table
              </p>
            </div>

            <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm`}>
              <h3 className="text-sm font-medium mb-1">Forms</h3>
              <p className="text-2xl font-bold">{resources.forms.count}</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <code>forms</code> table
              </p>
            </div>

            <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-4 rounded-lg shadow-sm relative`}>
              <h3 className="text-sm font-medium mb-1">Messages</h3>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {resources.messages.count}
                  {newMessagesCount > 0 && (
                    <span className="font-bold text-red-500">
                      ({newMessagesCount})
                    </span>
                  )}
                </p>
              </div>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <code>messages</code> table
              </p>
            </div>
          </div>
        )}

        {/* Recent Messages */}
        <section className="mt-8 p-4 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Messages</h3>
          {msgsLoading ? (
            <div>Loading messages...</div>
          ) : (
            <ul className="space-y-2">
              {messages.map(msg => (
                <li key={msg.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-bold">{msg.name}</p>
                    <p className="text-sm">{msg.subject}</p>
                  </div>
                  <span className={`text-xs ${msg.is_read ? 'text-gray-500' : 'text-red-500'}`}>
                    {msg.is_read ? 'Read' : 'Unread'}
                  </span>
                </li>
              ))}
              {messages.length === 0 && <li className="text-sm text-gray-500">No messages found</li>}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
