import { ReactNode } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Link, useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { isAdmin, logout } = useAdmin();
    const navigate = useNavigate();

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-red-600 mb-2">אין הרשאת גישה</h1>
                    <p className="text-gray-600 mb-6">אין לך הרשאה לגשת לעמוד זה</p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        חזור לעמוד הבית
                    </Link>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 rtl">
            {/* Admin Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/admin" className="flex items-center">
                                <img src="/assets/images/logo.png" alt="Logo" className="h-8 w-auto ml-2" />
                                <span className="text-xl font-bold text-gray-900">קשב פלוס - ניהול</span>
                            </Link>
                        </div>

                        <nav className="flex space-x-8 space-x-reverse">
                            <Link
                                to="/admin"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                דשבורד
                            </Link>
                            <Link
                                to="/admin/user"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                משתמשים
                            </Link>
                            <Link
                                to="/admin/content"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                תוכן
                            </Link>
                        </nav>

                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                התנתק
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Title */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}