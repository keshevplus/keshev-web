// AdminDashboard.tsx

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { pagesService, servicesService, formsService, messagesService, leadsService } from '../../services/api';

interface AdminDashboardProps {
  darkMode?: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode = false }) => {
  const [stats, setStats] = useState({
    pages: 0,
    services: 0,
    forms: 0,
    messages: 0,
    leads: 0
  });
  const { t } = useTranslation();

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

        setStats({
          pages: pagesRes.length,
          services: servicesRes.length,
          forms: formsRes.length,
          messages: messagesRes?.messages?.length || 0,
          leads: leadsRes?.leads?.length || 0
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">Messages</h3>
          <p className="text-3xl font-bold">{stats.messages}</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} p-6 rounded-lg shadow-sm`}>
          <h3 className="text-lg font-semibold mb-2">Leads</h3>
          <p className="text-3xl font-bold">{stats.leads}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
