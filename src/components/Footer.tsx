import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">קשב פלוס - Keshev Plus</h3>
            <p className="text-gray-400">
              רופאה מומחית לאבחון וטיפול בהפרעות קשב ופעלתנות יתר (ADHD/ADD)
              בילדים, בנוער ובמבוגרים. בעלת ניסיון רב בתחום והסמכה לאבחון וטיפול
              בהפרעות קשב ופעלתנות יתר של משרד הבריאות
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">מהי Adhd?</li>
              <li className="text-gray-400">Maintenance</li>
              <li className="text-gray-400">Detailing</li>
              <li className="text-gray-400">Diagnostics</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>רמת גן</li>
              <li>ישראל</li>
              <li>054-4777469</li>
              <li>dr@keshevplus.co.il</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} כל הזכויות שמורות לקשב פלוס </p>{' '}
        </div>
      </div>
    </footer>
  );
}
