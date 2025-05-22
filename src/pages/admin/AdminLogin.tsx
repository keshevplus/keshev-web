import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth(); 
  const navigate = useNavigate(); 
  const { t, i18n } = useTranslation(['forms']); 
  const isRTL = i18n.language === 'he';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password); 
      navigate('/admin'); 
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 px-6 py-12">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img
            src="/assets/images/main-logo-gold.png"
            alt="Keshev Plus Logo"
            className="h-24 w-auto object-contain"
          />
        </div>
        
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          {t('forms:admin.title')}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${isRTL ? 'text-right' : 'text-left'} text-gray-700 mb-1`}>
              {t('forms:admin.email')}
            </label>
            <input
              id="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="admin@user.com"
              type="email"
              required
              className={`w-full px-3 py-2 ${isRTL ? 'text-right' : 'text-left'} border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            />
          </div>
          
          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${isRTL ? 'text-right' : 'text-left'} text-gray-700 mb-1`}>
              {t('forms:admin.password')}
            </label>
            <div className="relative">
              <input
                id="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="******"
                className={`w-full px-3 py-2 ${isRTL ? 'text-right' : 'text-left'} border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className={`absolute inset-y-0 ${isRTL ? 'left-0' : 'right-0'} flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none`}
                aria-label={showPassword ? t('forms:admin.hide_password') : t('forms:admin.show_password')}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-right">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {isLoading ? t('forms:admin.logging_in') : t('forms:admin.login')}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-500">
          {t('forms:admin.authorized_only')}
        </p>
        
        <div className="mt-4 text-center">
          <a href="/admin/register" className="text-sm text-green-600 hover:text-green-800">
            Create Test Admin Account
          </a>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;