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
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchStats() {
      try {
        console.log('🔍 AdminDashboard: Fetching all stats...');
        
        // Fetch stats one by one for better debugging
        const pagesRes = await pagesService.getAllPages();
        console.log('📄 Pages response:', pagesRes);
        
        const servicesRes = await servicesService.getAllServices();
        console.log('🔧 Services response:', servicesRes);
        
        const formsRes = await formsService.getAllForms();
        console.log('📝 Forms response:', formsRes);
        
        // Add extra debugging for messages and leads
        console.log('📨 Fetching messages...');
        const messagesRes = await messagesService.getAllMessages();
        console.log('📨 Messages response:', messagesRes);
        console.log('📨 Messages data structure:', JSON.stringify(messagesRes));
        
        console.log('👥 Fetching leads...');
        const leadsRes = await leadsService.getAllLeads();
        console.log('👥 Leads response:', leadsRes);
        console.log('👥 Leads data structure:', JSON.stringify(leadsRes));

        // Log the counts we're calculating
        const messageCount = messagesRes?.messages?.length || 0;
        const leadCount = leadsRes?.leads?.length || 0;
        console.log(`📊 Counts - Messages: ${messageCount}, Leads: ${leadCount}`);
        
        setStats({
          pages: pagesRes.length,
          services: servicesRes.length,
          forms: formsRes.length,
          messages: messageCount,
          leads: leadCount
        });
      } catch (error) {
        console.error('❌ Error fetching stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {i18n.language === 'he' ? 'בקרה אדמיניסטרציה' : t('admin.dashboard')}
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
