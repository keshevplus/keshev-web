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
          <nav className="text-center md:text-right">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-gray-300 hover:text-white">
                    <span className='text-gray-300 hover:text-white'>{item.text}</span>
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
