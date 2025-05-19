import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"; 
import { useNavigate } from "react-router-dom"; 

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password); 
      navigate('/admin'); 
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    }
  };

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
      />
      <button type="submit">Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default AdminLogin;