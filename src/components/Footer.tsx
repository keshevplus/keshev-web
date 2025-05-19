import { Link } from 'react-router-dom';
import { navItems } from './Navbar';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Copyright and credits */}
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold mb-4">
              &copy; {new Date().getFullYear()} כל הזכויות שמורות לקשב פלוס
            </p>
            <p className="text-sm text-gray-300">
              נבנה על ידי aloncode
            </p>
          </div>

          {/* Column 2: Navigation links */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">תפריט ניווט</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navItems.filter(item => !item.mobileOnly).map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-base text-white hover:text-orange-400 transition-colors block"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact info */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">צור קשר</h3>
            <p className="mb-2">
              <a href="tel:055-27-399-27" className="text-white hover:text-orange-400">
                טלפון: 055-27-399-27
              </a>
            </p>
            <p>
              <a href="/contact" className="text-white hover:text-orange-400">
                דף יצירת קשר
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
