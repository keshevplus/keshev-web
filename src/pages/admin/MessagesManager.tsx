// MessagesManager.tsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { messagesService } from '../../services/api';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const MessagesManager: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  const [messages, setMessages] = useState<Message[]>([]);
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
    fetchMessages();
  }, [page, filter]);

  async function fetchMessages() {
    try {
      setLoading(true);
      const response = await messagesService.getAllMessages(page, 10, filter);
      setMessages(response.messages);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await messagesService.deleteMessage(id);
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  }
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  if (loading && messages.length === 0) {
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
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Messages Management</h2>

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

      <div className={`rounded-lg shadow overflow-hidden overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ maxWidth: '100%', width: '100%' }}>
        <table className="w-full" style={{ borderSpacing: '0', borderCollapse: 'separate' }}>
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Name</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Subject</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Message</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Created At</th>
              <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
            {messages.length === 0 ? (
              <tr>
                <td colSpan={6} className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {filter ? 'No messages match your search' : 'No messages found'}
                </td>
              </tr>
            ) : (
              messages.map((message) => (
                <React.Fragment key={message.id}>
                  <tr className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{message.name}</td>
                    <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{message.email}</td>
                    <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{message.subject}</td>
                    <td className={`px-4 py-2 text-sm break-words ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {message.message.length > 50 ? `${message.message.substring(0, 50)}...` : message.message}
                    </td>
                    <td className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {message.created_at ? new Date(message.created_at).toLocaleString('en-US') : 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-sm whitespace-nowrap">
                      <button
                        className={`mr-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                        onClick={() => setExpandedRowId(message.id)}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(message.id)}
                        className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedRowId === message.id && (
                    <tr>
                      <td colSpan={6} className={`p-4 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div><strong>Name:</strong> {message.name}</div>
                          <div><strong>Email:</strong> {message.email}</div>
                          <div><strong>Subject:</strong> {message.subject}</div>
                          <div className="col-span-2"><strong>Message:</strong> {message.message}</div>
                          <div><strong>Received:</strong> {message.created_at ? new Date(message.created_at).toLocaleString('en-US') : 'N/A'}</div>
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
            {pagination.total > 0 && <span className="text-sm ml-2">({pagination.total} messages total)</span>}
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

export default MessagesManager;
