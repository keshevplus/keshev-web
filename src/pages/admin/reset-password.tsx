import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState<'request' | 'reset' | 'done'>('request');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // If there's a token in the URL, show reset form
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      setToken(urlToken);
      setStep('reset');
    }
  }, []);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post(proca.env.VITE_API_BASE_URL + '/auth/request-reset', { email });
      setStep('done');
      setMessage('Check your email for a reset link.');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error sending reset email.');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('/auth/reset-password', { token, newPassword });
      setStep('done');
      setMessage('Password updated! You can now log in.');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error resetting password.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Admin Password Reset</h2>
      {step === 'request' && (
        <form onSubmit={handleRequest}>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit">Send Reset Link</button>
        </form>
      )}
      {step === 'reset' && (
        <form onSubmit={handleReset}>
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8} />
          <button type="submit">Reset Password</button>
        </form>
      )}
      {step === 'done' && <div>{message}</div>}
      {message && step !== 'done' && <div style={{ color: 'red', marginTop: 10 }}>{message}</div>}
    </div>
  );
};

export default ResetPassword;
