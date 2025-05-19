import { Link } from 'react-router-dom';
import { navItems } from './Navbar';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-wrap justify-between items-center ">
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold sticky bottom-0">
              &copy; {new Date().getFullYear()} כל הזכויות שמורות לקשב פלוס
            </p>
          </div>
          <div className="h-16 md:hidden" />
          <nav className="text-center md:text-right" aria-label="Footer navigation">
            <ul className="justify-center md:justify-end space-x-6 rtl:space-x-reverse">
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
          </nav>
          נבנה על ידי aloncode 
        </div>
      </div>
    </footer>
  );
}
