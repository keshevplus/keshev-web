// LeadsManager.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { leadsService } from '../../services/leads-api-new';
import { FiCheck, FiEye, FiTrash2, FiFilter, FiSearch, FiRefreshCw } from 'react-icons/fi';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
  date_received: string;
  is_read?: boolean;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const LeadsManager: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState<string>('date_received');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  // Memoize the filtered and sorted leads
  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      // Handle date fields
      if (sortField === 'date_received' || sortField === 'created_at') {
        const dateA = new Date(a[sortField as keyof Lead] as string).getTime();
        const dateB = new Date(b[sortField as keyof Lead] as string).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      // Handle string fields
      const valueA = String(a[sortField as keyof Lead] || '');
      const valueB = String(b[sortField as keyof Lead] || '');
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    });
  }, [leads, sortField, sortDirection]);

  useEffect(() => {
    fetchLeads();
  }, [page, filter]);

  async function fetchLeads() {
    try {
      setLoading(true);
      setRefreshing(true);
      console.log('Fetching leads, page:', page, 'filter:', filter);
      
      // Get leads and unread count in parallel
      const [leadsResponse, unreadCountResponse] = await Promise.allSettled([
        leadsService.getAllLeads(page, 100, filter),
        leadsService.getUnreadCount()
      ]);
      
      // Process leads response
      if (leadsResponse.status === 'fulfilled' && leadsResponse.value) {
        const response = leadsResponse.value;
        console.log('API Response:', response);
        
        if (!response || !response.leads) {
          console.error('Invalid response format:', response);
          setLeads([]);
          setPagination({
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false
          });
        } else {
          const leadsWithReadStatus = response.leads.map((lead: Lead) => ({
            ...lead,
            is_read: lead.is_read === undefined ? false : lead.is_read // Default to unread if not specified
          }));
          
          setLeads(leadsWithReadStatus);
          setPagination(response.pagination);
          console.log('Leads loaded:', leadsWithReadStatus);
          
          // Update local unread count if API call fails
          const localUnreadCount = leadsWithReadStatus.filter((lead: Lead) => !lead.is_read).length;
          console.log('Local unread count:', localUnreadCount);
          
          // Only update if unreadCountResponse failed
          if (unreadCountResponse.status !== 'fulfilled') {
            setUnreadCount(localUnreadCount);
          }
        }
      } else {
        console.error('Error fetching leads:', leadsResponse.status === 'rejected' ? leadsResponse.reason : 'Unknown error');
        setLeads([]);
      }
      
      // Process unread count response
      if (unreadCountResponse.status === 'fulfilled' && unreadCountResponse.value) {
        const count = unreadCountResponse.value;
        console.log('Unread count from API:', count);
        setUnreadCount(count);
      }
    } catch (error) {
      console.error('Error in fetch operation:', error);
      setLeads([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function markAsRead(id: string) {
    try {
      await leadsService.markLeadAsRead(id);
      // Update local state to reflect the change without refetching
      setLeads(leads.map(lead => 
        lead.id === id ? { ...lead, is_read: true } : lead
      ));
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking lead as read:', error);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm(t('admin.confirmDelete', 'Are you sure you want to delete this lead?'))) {
      try {
        await leadsService.deleteLead(id);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  }
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  // Function to handle sorting when a column header is clicked
  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending for dates, ascending for text
      setSortField(field);
      setSortDirection(field.includes('date') ? 'desc' : 'asc');
    }
  };

  // Function to handle refresh button click
  const handleRefresh = () => {
    fetchLeads();
  };

  // Sort indicator component
  const SortIndicator = ({ field }: { field: string }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div className="p-6" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {t('admin.leadsManagement', 'ניהול לקוחות')}
          {unreadCount > 0 && (
            <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded-full">
              {unreadCount} {t('admin.unread', 'חדש')}
            </span>
          )}
        </h2>
        <button
          onClick={handleRefresh}
          className={`flex items-center px-3 py-1 rounded ${
            darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          } transition-colors duration-200 ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={refreshing}
        >
          <FiRefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {t('admin.refresh', 'רענון')}
        </button>
      </div>

      <div className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>NeonDB Table: <code>leads</code></p>
        <p>Database: <code>keshevplus_production</code></p>
      </div>

      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          </div>
          <input
            type="text"
            placeholder={t('admin.searchLeads', 'Search by name, email, or subject')}
            value={filter}
            onChange={handleFilterChange}
            className={`w-full md:w-1/2 pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
            }`}

// Create the sort indicator component
const SortIndicator = ({ field }: { field: string }) => {
  if (sortField !== field) return null;
  return (
    <span className="ml-1">
      {sortDirection === 'asc' ? '▲' : '▼'}
    </span>
  );
};

return (
  <div className="p-6" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
    <div className="flex justify-between items-center mb-4">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {t('admin.leadsManagement', 'ניהול לקוחות')}
        {unreadCount > 0 && (
          <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded-full">
            {unreadCount} {t('admin.unread', 'חדש')}
          </span>
        )}
      </h2>
      <button
        onClick={handleRefresh}
        className={`flex items-center px-3 py-1 rounded ${
          darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        } transition-colors duration-200 ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={refreshing}
      >
        <FiRefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
        {t('admin.refresh', 'רענון')}
      </button>
    </div>

    <div className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      <p>NeonDB Table: <code>leads</code></p>
      <p>Database: <code>keshevplus_production</code></p>
    </div>

    <div className="mb-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
        </div>
        <input
          type="text"
          placeholder={t('admin.searchLeads', 'Search by name, email, or subject')}
          value={filter}
          onChange={handleFilterChange}
          className={`w-full md:w-1/2 pl-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
          }`}
        />
      </div>
    </div>

    <div className={`rounded-lg shadow overflow-hidden overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
          <tr>
            <th 
              className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center justify-end">
                {t('admin.name', 'Name')}
                <SortIndicator field="name" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('email')}
            >
              <div className="flex items-center justify-end">
                {t('admin.contactInfo', 'Email / Phone')}
                <SortIndicator field="email" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('subject')}
            >
              <div className="flex items-center justify-end">
                {t('admin.subject', 'Subject')}
                <SortIndicator field="subject" />
              </div>
            </th>
            <th 
              className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('date_received')}
            >
              <div className="flex items-center justify-end">
                {t('admin.dateReceived', 'Date Received')}
                <SortIndicator field="date_received" />
              </div>
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('admin.actions', 'Actions')}
            </th>
          </tr>
        </thead>
        <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
          {leads.length === 0 ? (
            <tr>
              <td colSpan={6} className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                No leads found
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <React.Fragment key={lead.id}>
                <tr className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className={`px-4 py-2 text-sm ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.name}</td>
                  <td className={`px-4 py-2 text-sm ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.email}</td>
                  <td className={`px-4 py-2 text-sm ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.phone}</td>
                  <td className={`px-4 py-2 text-sm break-words ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {lead.message.length > 50 ? `${lead.message.substring(0, 50)}...` : lead.message}
                  </td>
                  <td className={`px-4 py-2 text-sm ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {lead.created_at ? new Date(lead.created_at).toLocaleString() : 'N/A'}
                  </td>
                  <td className={`px-4 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    {lead.date_received ? new Date(lead.date_received).toLocaleString('en-US') : new Date(lead.created_at).toLocaleString('en-US')}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <button
                      className={`mr-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                      onClick={() => {
                        setExpandedRowId(lead.id);
                        if (!lead.is_read) {
                          markAsRead(lead.id);
                        }
                      }}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedRowId === lead.id && (
                  <tr>
                    <td colSpan={6} className={`p-4 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div><strong>Name:</strong> {lead.name}</div>
                        <div><strong>Email:</strong> {lead.email}</div>
                        <div><strong>Phone:</strong> {lead.phone}</div>
                        <div><strong>Subject:</strong> {lead.subject}</div>
                        <div className="col-span-3"><strong>Message:</strong> {lead.message}</div>
                        <div><strong>Received:</strong> {lead.date_received ? new Date(lead.date_received).toLocaleString('en-US') : new Date(lead.created_at).toLocaleString('en-US')}</div>
                      </div>
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <React.Fragment key={lead.id}>
                  <tr className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className={`px-4 py-2 text-sm ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.name}</td>
                    <td className={`px-4 py-2 text-sm ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.email}</td>
                    <td className={`px-4 py-2 text-sm ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{lead.phone}</td>
                    <td className={`px-4 py-2 text-sm break-words ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {lead.message.length > 50 ? `${lead.message.substring(0, 50)}...` : lead.message}
                    </td>
                    <td className={`px-4 py-2 text-sm ${lead.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {lead.created_at ? new Date(lead.created_at).toLocaleString() : 'N/A'}
                    </td>
                    <td className={`px-4 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                      {lead.date_received ? new Date(lead.date_received).toLocaleString('en-US') : new Date(lead.created_at).toLocaleString('en-US')}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <button
                        className={`mr-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                        onClick={() => {
                          setExpandedRowId(lead.id);
                          if (!lead.is_read) {
                            markAsRead(lead.id);
                          }
                        }}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedRowId === lead.id && (
                    <tr>
                      <td colSpan={6} className={`p-4 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div><strong>Name:</strong> {lead.name}</div>
                          <div><strong>Email:</strong> {lead.email}</div>
                          <div><strong>Phone:</strong> {lead.phone}</div>
                          <div><strong>Subject:</strong> {lead.subject}</div>
                          <div className="col-span-3"><strong>Message:</strong> {lead.message}</div>
                          <div><strong>Received:</strong> {lead.date_received ? new Date(lead.date_received).toLocaleString('en-US') : new Date(lead.created_at).toLocaleString('en-US')}</div>
                        </div>
                        <button
                          className={`mt-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                          onClick={() => setExpandedRowId(null)}
                        >
                          Close details
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg disabled:opacity-50 ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Previous
          </button>
          <span className={darkMode ? 'text-gray-200' : 'text-gray-600'}>
            Page {pagination.page} of {pagination.totalPages} 
            {pagination.total > 0 && <span className="text-sm ml-2">({pagination.total} leads total)</span>}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pagination.totalPages}
            className={`px-4 py-2 rounded-lg disabled:opacity-50 ${
              darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadsManager;
