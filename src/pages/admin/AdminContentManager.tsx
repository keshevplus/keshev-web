import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { contentService } from '../../services/api';

interface Content {
    id: string;
    title: string;
    content_type: string;
    content_data: any;
    status: string;
    created_by: string;
    created_at: string;
    updated_at: string;
}

export default function AdminContentManager({ darkMode = false }: { darkMode?: boolean }) {
    const [content, setContent] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();
    const isRtl = i18n.language === 'he';

    useEffect(() => {
        fetchContent();
    }, []);

    async function fetchContent() {
        try {
            const contentData = await contentService.getAllContent() as Content[];
            setContent(contentData);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (window.confirm('Are you sure you want to delete this content?')) {
            try {
                await contentService.deleteContent(id);
                fetchContent();
            } catch (error) {
                console.error('Error deleting content:', error);
            }
        }
    }

    if (loading) {
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
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Content Management</h2>

            <div className={`rounded-lg shadow overflow-hidden overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <table className="w-full" style={{ borderSpacing: '0', borderCollapse: 'separate' }}>
                    <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <tr>
                            <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Title</th>
                            <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type</th>
                            <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                            <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Created</th>
                            <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Updated</th>
                            <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
                        {content.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                    No content found
                                </td>
                            </tr>
                        ) : (
                            content.map((item) => (
                                <tr key={item.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                    <td className={`px-4 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                        <div className="font-medium">{item.title}</div>
                                    </td>
                                    <td className={`px-4 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                                        {item.content_type}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className={`px-4 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </td>
                                    <td className={`px-4 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                                        {new Date(item.updated_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleDelete(item.id)} className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}