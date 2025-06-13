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
    is_read?: boolean;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

const AdminMessagesManager: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
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
            const response = await messagesService.getAllMessages(page, 100, filter);
            const messagesWithReadStatus = response.messages.map((msg: Message) => ({
                ...msg,
                is_read: msg.is_read === undefined ? false : msg.is_read
            }));
            setMessages(messagesWithReadStatus);
            setPagination(response.pagination);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    }

    async function markAsRead(id: string) {
        try {
            await messagesService.markMessageAsRead(id);
            setMessages(messages.map(msg =>
                msg.id === id ? { ...msg, is_read: true } : msg
            ));
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    }

    async function handleDelete(id: string) {
        if (window.confirm('האם אתה בטוח שברצונך למחוק את ההודעה הזו?')) {
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
        setPage(1);
    };

    const unreadCount = messages.filter(msg => !msg.is_read).length;

    if (loading && messages.length === 0) {
        return (
            <div className={`p-6 ${darkMode ? 'text-white' : 'text-gray-800'} text-center`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4">טוען הודעות...</p>
            </div>
        );
    }

    return (
        <div className="p-6" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    ניהול הודעות
                    {unreadCount > 0 && (
                        <span className="mr-3 bg-red-500 text-white text-sm px-2.5 py-0.5 rounded-full">
                            {unreadCount} הודעות חדשות
                        </span>
                    )}
                </h2>
            </div>

            <div className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>מסד נתונים: <code>keshevplus_production</code></p>
                <p>טבלה: <code>messages</code></p>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="חיפוש לפי שם, אימייל, או נושא"
                    value={filter}
                    onChange={handleFilterChange}
                    className={`w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'}`}
                />
            </div>

            <div className={`rounded-lg shadow overflow-hidden overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ maxWidth: '100%', width: '100%' }}>
                <table className="w-full" style={{ borderSpacing: '0', borderCollapse: 'separate' }}>
                    <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <tr>
                            <th className={`px-4 py-3 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>שם</th>
                            <th className={`px-4 py-3 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>אימייל</th>
                            <th className={`px-4 py-3 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>נושא</th>
                            <th className={`px-4 py-3 text-right text-xs font-medium uppercase tracking-wider w-1/4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>הודעה</th>
                            <th className={`px-4 py-3 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>תאריך</th>
                            <th className={`px-4 py-3 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>פעולות</th>
                        </tr>
                    </thead>
                    <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
                        {messages.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                    {filter ? 'לא נמצאו הודעות התואמות את החיפוש שלך' : 'לא נמצאו הודעות'}
                                </td>
                            </tr>
                        ) : (
                            messages.map((message) => (
                                <React.Fragment key={message.id}>
                                    <tr className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} ${message.is_read === false ? (darkMode ? 'bg-gray-700/50' : 'bg-blue-50/50') : ''}`}>
                                        <td className={`px-4 py-2 text-sm ${message.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{message.name}</td>
                                        <td className={`px-4 py-2 text-sm ${message.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                            <a href={`mailto:${message.email}`} className="hover:underline">
                                                {message.email}
                                            </a>
                                        </td>
                                        <td className={`px-4 py-2 text-sm ${message.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{message.subject}</td>
                                        <td className={`px-4 py-2 text-sm break-words ${message.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {message.message.length > 50 ? `${message.message.substring(0, 50)}...` : message.message}
                                        </td>
                                        <td className={`px-4 py-2 text-sm whitespace-nowrap ${message.is_read === false ? 'font-bold' : ''} ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {message.created_at ? new Date(message.created_at).toLocaleString('he-IL') : 'N/A'}
                                        </td>
                                        <td className="px-4 py-2 text-sm whitespace-nowrap">
                                            <div className="flex gap-2">
                                                <button
                                                    className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                                                    onClick={() => {
                                                        setExpandedRowId(message.id);
                                                        if (!message.is_read) {
                                                            markAsRead(message.id);
                                                        }
                                                    }}
                                                >
                                                    פרטים
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(message.id)}
                                                    className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                                                >
                                                    מחיקה
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedRowId === message.id && (
                                        <tr>
                                            <td colSpan={6} className={`p-4 ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <strong>שם:</strong> {message.name}
                                                    </div>
                                                    <div>
                                                        <strong>אימייל:</strong>
                                                        <a href={`mailto:${message.email}`} className={`hover:underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                                            {message.email}
                                                        </a>
                                                    </div>
                                                    <div>
                                                        <strong>נושא:</strong> {message.subject}
                                                    </div>
                                                    <div className="col-span-3">
                                                        <strong>הודעה:</strong>
                                                        <p className="mt-2 whitespace-pre-wrap">{message.message}</p>
                                                    </div>
                                                    <div>
                                                        <strong>התקבל:</strong> {message.created_at ? new Date(message.created_at).toLocaleString('he-IL') : 'N/A'}
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex gap-2">
                                                    <button
                                                        className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                                                        onClick={() => setExpandedRowId(null)}
                                                    >
                                                        סגור פרטים
                                                    </button>
                                                    <button
                                                        className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                                                        onClick={() => handleDelete(message.id)}
                                                    >
                                                        מחק הודעה
                                                    </button>
                                                </div>
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
                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className={`px-4 py-2 rounded-lg disabled:opacity-50 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        הקודם
                    </button>
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-600'}>
                        עמוד {pagination.page} מתוך {pagination.totalPages}
                        {pagination.total > 0 && <span className="text-sm mr-2">({pagination.total} הודעות בסך הכל)</span>}
                    </span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page >= pagination.totalPages}
                        className={`px-4 py-2 rounded-lg disabled:opacity-50 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        הבא
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminMessagesManager;