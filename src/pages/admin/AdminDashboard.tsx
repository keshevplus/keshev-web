// AdminDashboard.tsx

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { pagesService, servicesService, formsService, messagesService, leadsService } from '../../services/api';
import { useTranslation } from 'react-i18next';
import { FiRefreshCw, FiAlertTriangle, FiCheckCircle, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiMessageSquare, FiUsers, FiSettings, FiGlobe, FiLayout } from 'react-icons/fi';

interface AdminDashboardProps {
  darkMode?: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode = false }) => {
  const [apiState, setApiState] = useState({
    pages: { status: 'idle', count: 0, error: null, lastUpdated: null },
    services: { status: 'idle', count: 0, error: null, lastUpdated: null },
    forms: { status: 'idle', count: 0, error: null, lastUpdated: null },
    messages: { status: 'idle', count: 0, error: null, lastUpdated: null },
    leads: { status: 'idle', count: 0, error: null, lastUpdated: null }
  });
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === 'he';

  // Handle menu toggle
  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

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

  useEffect(() => {
    async function fetchStats() {
      try {
        const [pagesRes, servicesRes, formsRes, messagesRes, leadsRes] = await Promise.all([
          pagesService.getAllPages(),
          servicesService.getAllServices(),
          formsService.getAllForms(),
          messagesService.getAllMessages(),
          leadsService.getAllLeads(),
        ]);

        setApiState({
          pages: { status: 'success', count: pagesRes.length, error: null, lastUpdated: new Date() },
          services: { status: 'success', count: servicesRes.length, error: null, lastUpdated: new Date() },
          forms: { status: 'success', count: formsRes.length, error: null, lastUpdated: new Date() },
          messages: { status: 'success', count: messagesRes.length, error: null, lastUpdated: new Date() },
          leads: { status: 'success', count: leadsRes.length, error: null, lastUpdated: new Date() }
          forms: formsRes.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {t('admin.dashboard')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">Pages</h3>
          <p className="text-3xl font-bold">{stats.pages}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <p className="text-3xl font-bold">{stats.services}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">Forms</h3>
          <p className="text-3xl font-bold">{stats.forms}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
