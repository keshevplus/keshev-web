import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/admin/AdminLayout';

interface User {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
    role: string;
    createdAt?: string;
    lastLogin?: string;
}

const AdminUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<string>('all');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    if (loading) {
        return (
            <AdminLayout title="User Management">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    <p className="ml-4 text-lg text-gray-700">טוען משתמשים...</p>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout title="User Management">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-red-500 text-xl mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            נסה שוב
                        </button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="ניהול משתמשים">
            <div className="container mx-auto px-4 py-8 rtl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">ניהול משתמשים</h1>
                    <p className="text-gray-600">ניהול חשבונות משתמשים ופרופילים</p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                חיפוש משתמש
                            </label>
                            <input
                                type="text"
                                placeholder="חפש לפי שם או אימייל..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                סינון לפי תפקיד
                            </label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">כל התפקידים</option>
                                <option value="admin">מנהל</option>
                                <option value="user">משתמש</option>
                                <option value="doctor">רופא</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="bg-blue-500 rounded-full p-2">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-blue-600">סך הכל משתמשים</p>
                                <p className="text-2xl font-bold text-blue-900">{users.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="bg-green-500 rounded-full p-2">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-green-600">משתמשים פעילים</p>
                                <p className="text-2xl font-bold text-green-900">{users.filter(u => u.role === 'user').length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="bg-purple-500 rounded-full p-2">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-purple-600">רופאים</p>
                                <p className="text-2xl font-bold text-purple-900">{users.filter(u => u.role === 'doctor').length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <div className="bg-orange-500 rounded-full p-2">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="mr-4">
                                <p className="text-sm font-medium text-orange-600">מנהלים</p>
                                <p className="text-2xl font-bold text-orange-900">{users.filter(u => u.role === 'admin').length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Grid */}
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">לא נמצאו משתמשים</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200 border border-gray-200"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="relative">
                                        <img
                                            src={user.profilePicture || '/assets/images/default-profile.png'}
                                            alt={user.name}
                                            className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-gray-200"
                                        />
                                        <div className={`absolute bottom-0 left-0 w-6 h-6 rounded-full border-2 border-white ${user.role === 'admin' ? 'bg-red-500' :
                                            user.role === 'doctor' ? 'bg-purple-500' :
                                                'bg-green-500'
                                            }`}></div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-800 mb-1 text-center">{user.name}</h3>
                                    <p className="text-gray-600 mb-2 text-center">{user.email}</p>

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' :
                                            user.role === 'doctor' ? 'bg-purple-100 text-purple-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                            {user.role === 'admin' ? 'מנהל' :
                                                user.role === 'doctor' ? 'רופא' :
                                                    'משתמש'}
                                        </span>
                                    </div>

                                    {user.createdAt && (
                                        <p className="text-xs text-gray-500 mb-4 text-center">
                                            נרשם: {new Date(user.createdAt).toLocaleDateString('he-IL')}
                                        </p>
                                    )}

                                    <div className="flex gap-2 w-full">
                                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                                            צפה בפרופיל
                                        </button>
                                        <button className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm">
                                            עריכה
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminUser;

