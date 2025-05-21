import { Link } from 'react-router-dom';
import { navItems } from './Navbar';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Copyright and credits */}
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold mb-1">
              &copy; {new Date().getFullYear()} כל הזכויות שמורות לקשב פלוס
            </p>
            <p className="text-sm text-gray-300">
              נבנה על ידי aloncode
            </p>
          </div>

          {/* Column 2: Navigation links */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-2">תפריט ניווט</h3>
            <nav aria-label="Footer navigation">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1 text-right">
                {navItems.filter(item => !item.mobileOnly).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-sm md:text-base text-white hover:text-orange-400 transition-colors py-1"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Column 3: Contact info */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-2">צור קשר</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6">
              <a href="tel:055-27-399-27" className="text-white hover:text-orange-400">
                טלפון: 055-27-399-27
              </a>
              <a href="/contact" className="text-white hover:text-orange-400">
                דף יצירת קשר
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
