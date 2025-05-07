import { Link } from 'react-router-dom';
import { navItems } from './Navbar';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-right">
            <p className="text-base font-semibold">
              &copy; {new Date().getFullYear()} כל הזכויות שמורות לקשב פלוס
            </p>
          </div>
          <nav className="text-center md:text-right" aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-6 rtl:space-x-reverse">
              {navItems.map((item) => (
                <li key={item.path} className="inline-block">
                  <Link
                    to={item.path}
                    className="text-base text-white hover:text-orange-400 transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-center md:text-left text-sm text-gray-400">
            נבנה על ידי aloncode
          </div>
        </div>
      </div>
    </footer>
  );
}
