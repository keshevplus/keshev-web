// AdminDashboard.tsx

import React, { useEffect, useState } from 'react';
import { pagesService, servicesService, formsService, messagesService, leadsService } from '../../services/api';
import { useTranslation } from 'react-i18next';

interface AdminDashboardProps {
  darkMode: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode }) => {
  const [stats, setStats] = useState({
    pages: 0,
    services: 0,
    forms: 0,
    messages: 0,
    leads: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching admin stats...');

        // Function to safely fetch data with fallbacks
        const safeDataFetch = async <T,>(fetchFn: () => Promise<T>, defaultValue: T, entityName = 'items') => {
          try {
            console.log(`Fetching ${entityName}...`);
            const result = await fetchFn();
            console.log(`${entityName} result:`, result);
            return result;
          } catch (error) {
            console.error(`Error fetching ${entityName}:`, error);
            return defaultValue;
          }
        };

        // Fetch data in parallel with individual error handling
        const [pagesCount, servicesCount, formsCount, messagesResponse, leadsResponse] = await Promise.allSettled([
          safeDataFetch(() => pagesService.getAllPages(), [], 'pages'),
          safeDataFetch(() => servicesService.getAllServices(), [], 'services'),
          safeDataFetch(() => formsService.getAllForms(), [], 'forms'),
          safeDataFetch(() => messagesService.getAllMessages(), { messages: [] }, 'messages'),
          safeDataFetch(() => leadsService.getAllLeads(), { leads: [] }, 'leads')
        ]);

        // Safely update stats with fallbacks if any request failed
        setStats(prev => ({
          ...prev,
          pages: pagesCount.status === 'fulfilled' ? pagesCount.value.length : 0,
          services: servicesCount.status === 'fulfilled' ? servicesCount.value.length : 0,
          forms: formsCount.status === 'fulfilled' ? formsCount.value.length : 0,
          messages: messagesResponse.status === 'fulfilled' ? (messagesResponse.value?.messages?.length || 0) : 0,
          leads: leadsResponse.status === 'fulfilled' ? (leadsResponse.value?.leads?.length || 0) : 0
        }));
        
      } catch (error) {
        // Global error fallback - should never reach here due to individual error handling
        console.error('Critical error in admin stats:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        // Always ensure loading state is reset
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {i18n.language === 'he' ? 'בקרה אדמיניסטרציה' : t('admin.dashboard')}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-t-green-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{t('admin.loading', 'טוען נתונים...')}</p>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default AdminDashboard;
