import { useEffect, useState } from 'react';

const AdminUsersManager = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users'); // Adjust the API endpoint as needed
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Admin Users Manager</h1>
            <ul>
                {users.map((user: { id: string; name: string; email: string }) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUsersManager;