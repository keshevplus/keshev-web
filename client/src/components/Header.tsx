import { Link, useLocation } from 'react-router-dom';
import { PhoneIcon } from './ui/PhoneIcon';
import React from 'react';

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
            [
              { path: '/', label: 'בית' },
              { path: '/about', label: 'אודותנו' },
              { path: '/services', label: 'שירותינו' },
              { path: '/diagnosis', label: 'תהליך אבחון' },
              { path: '/adhd', label: 'מהי ADHD' },
              { path: '/forms', label: 'שאלונים' },
              { path: '/contact', label: 'יצירת קשר' },
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
          <a href="tel:055-2739927" className="flex items-center">
            <PhoneIcon className="w-4 h-4 phone-icon ms-2 bg-green-800 " /> 055-27-399-27
            <span className="text-gray-800">055-27-399-27</span>
          </a>
        </div>
      </div>
    </header>
  );
}
