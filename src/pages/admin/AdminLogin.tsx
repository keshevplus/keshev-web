import React, { useState, FormEvent, ChangeEvent } from 'react';

interface LoginResponse {
  token: string;
  user: {
    email: string;
    role: string;
  };
}

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data: LoginResponse | { message: string } = await res.json();
      if (!res.ok) throw new Error((data as { message: string }).message);
      setToken((data as LoginResponse).token);
      // Save token in localStorage if needed
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (token) return <div>Welcome, admin! Token: {token}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
      />
      <input
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default AdminLogin;