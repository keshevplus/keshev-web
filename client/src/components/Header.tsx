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
            <li>
              <Link to="/" className="text-gray-800 hover:text-green-800">
                ראשי
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-800 hover:text-green-800"
              >
                שירותים
              </Link>
            </li>
            <li>
              <Link
                to="/diagnosis"
                className="text-gray-800 hover:text-green-800"
              >
                אבחון
              </Link>
            </li>
            <li>
              <Link to="/adhd" className="text-gray-800 hover:text-green-800">
                מהי ADHD
              </Link>
            </li>
            <li>
              <Link to="/forms" className="text-gray-800 hover:text-green-800">
                שאלונים
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-800 hover:text-green-800">
                אודות
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-green-800"
              >
                צור קשר
              </Link>
            </li>
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
