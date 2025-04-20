import { Link } from 'react-router-dom';
import { navItems } from './Navbar';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">
              &copy; {new Date().getFullYear()} כל הזכויות שמורות לקשב פלוס
            </p>
          </div>
          <div>
            <ul className="flex flex-wrap justify-center md:justify-end space-x-6 rtl:space-x-reverse">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-lg text-white hover:text-orange-400 transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
