// LeadsManager.tsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { leadsService } from '../../services/leads-api';

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
}

const LeadsManager: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  });
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  useEffect(() => {
    fetchLeads();
  }, [page, filter]);

  async function fetchLeads() {
    try {
      setLoading(true);
      console.log('Fetching leads, page:', page, 'filter:', filter);
      
      const response = await leadsService.getAllLeads(page, 100, filter);
      console.log('API Response:', response);
      
      if (!response || !response.leads) {
        console.error('Invalid response format:', response);
        setLeads([]);
        setPagination({
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1
        });
        return;
      }
      
      const leadsWithReadStatus = response.leads.map((lead: Lead) => ({
        ...lead,
        is_read: lead.is_read === undefined ? false : lead.is_read // Default to unread if not specified
      }));
      
      setLeads(leadsWithReadStatus);
      setPagination(response.pagination);
      console.log('Leads loaded:', leadsWithReadStatus);
      console.log('Unread count:', leadsWithReadStatus.filter((lead: Lead) => !lead.is_read).length);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: string) {
    try {
      await leadsService.markLeadAsRead(id);
      // Update local state to reflect the change without refetching
      setLeads(leads.map(lead => 
        lead.id === id ? { ...lead, is_read: true } : lead
      ));
    } catch (error) {
      console.error('Error marking lead as read:', error);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this lead?')) {
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

  if (loading && leads.length === 0) {
    return (
      <div className={`p-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>ניהול לקוחות</h2>
      <div className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <p>NeonDB Table: <code>leads</code></p>
        <p>Database: <code>keshevplus_production</code></p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or subject"
          value={filter}
          onChange={handleFilterChange}
          className={`w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'
          }`}
        />
      </div>

      <div className={`rounded-lg shadow overflow-hidden overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="w-full" style={{ borderSpacing: '0', borderCollapse: 'separate' }}>
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Name</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Phone</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Subject</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Received</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
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
