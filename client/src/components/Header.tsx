import { Link, useLocation } from 'react-router-dom';
import { PhoneIcon } from './ui/PhoneIcon';

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
            {[
              { path: '/', label: 'ראשי' },
              { path: '/services', label: 'שירותים' },
              { path: '/diagnosis', label: 'אבחון' },
              { path: '/adhd', label: 'מהי ADHD' },
              { path: '/forms', label: 'שאלונים' },
              { path: '/about', label: 'אודות' },
              { path: '/contact', label: 'צור קשר' },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-gray-800 hover:text-green-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center">
          <a href="tel:054-4777469" className="flex items-center">
            <PhoneIcon className="w-5 h-5 phone-icon ms-2" />
            <span className="text-gray-800">054-4777469</span>
          </a>
        </div>
      </div>
    </header>
  );
}
