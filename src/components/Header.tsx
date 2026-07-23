import { Link, useLocation } from 'react-router-dom';
import { PhoneIcon } from './ui/PhoneIcon';
import { useCmsTranslations } from '../hooks/useCmsTranslations';

export default function Header() {
  const location = useLocation();
  const { t } = useCmsTranslations();
  const isHomePage = location.pathname === '/';
  const navItems = [
    { path: '/', label: t('nav.home', 'בית') },
    { path: '/about', label: t('nav.about', 'אודותינו') },
    { path: '/services', label: t('nav.services', 'שירותינו') },
    { path: '/diagnosis', label: t('nav.process', 'תהליך ההערכה') },
    { path: '/adhd', label: t('nav.adhd', 'מהי ADHD') },
    { path: '/forms', label: t('nav.questionnaires', 'שאלונים') },
    { path: '/contact', label: t('nav.contact', 'יצירת קשר') },
  ];

  return (
    <header className="bg-white shadow-md rtl">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          {!isHomePage && (
            <Link to="/">
              <img
                src="/assets/images/logo.png"
                alt="קשב פלוס"
                className="h-12 w-auto"
              />
            </Link>
          )}
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {
              navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-800 hover:text-green-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>

        <div className="flex items-center">
          <a href="tel:055-2739927" className="flex items-center">
            <PhoneIcon className="w-4 h-4 phone-icon ms-2 bg-green-800 " /> 055-27-399-27
            <span className="text-gray-800">055-27-399-27</span>
          </a>
        </div>
      </div>
    </header>
  );
}
