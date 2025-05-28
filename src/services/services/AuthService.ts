import { API_BASE_URL } from '../api';

class AuthService {
    async login(email: string, password: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password_hash: password }),
            });

            console.log('Login API response status:', response.status);
            const data = await response.json();
            if (!response.ok) {
                console.error('Login failed:', data);
                throw new Error(data?.message || `Login failed with status ${response.status}`);
            }
            return data;
        } catch (error) {
            console.error('API login error:', error);
            throw error;
        }
    }

    async registerTestAdmin(email: string, password: string, username: string) {
        // This is only for development purposes
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        try {
            // For development, we'll create a test admin directly
            const testAdminData = {
                token: `test-admin-${Date.now()}`,
                user: {
                    id: 1000,
                    username: username || 'Test Admin',
                    email: email,
                    role: 'admin'
                }
            };

            // Store in localStorage to simulate a real login
            localStorage.setItem('token', testAdminData.token);
            localStorage.setItem('user', JSON.stringify(testAdminData.user));

            return testAdminData;
        } catch (error) {
            console.error('Error creating test admin:', error);
            throw error;
        }
    }
}

export const authService = new AuthService();
