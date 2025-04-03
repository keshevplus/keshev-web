import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-orange-400/35 hover:bg-orange-400/60 text-black py-8 md:py-12 md:mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
              קשב פלוס - Keshev Plus
            </h3>
            <p className="text-black text-sm md:text-base">
              רופאה מומחית לאבחון וטיפול בהפרעות קשב ופעלתנות יתר (ADHD/ADD)
              בילדים, בנוער ובמבוגרים. בעלת ניסיון רב בתחום והסמכה לאבחון וטיפול
              בהפרעות קשב ופעלתנות יתר של משרד הבריאות
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <h4 className="text-md md:text-lg font-semibold mb-3 md:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
              <li>
                <Link to="/" className="text-black hover:text-green-800">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-black  hover:text-green-800"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-black  hover:text-green-800">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-black  hover:text-green-800"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-4 sm:mt-0">
            <h4 className="text-md md:text-lg font-semibold mb-3 md:mb-4">
              Services
            </h4>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
              <li>
                <Link to="/adhd" className="text-black  hover:text-green-800">
                  מהי ADHD?
                </Link>
              </li>
              <li className="text-black ">Maintenance</li>
              <li className="text-black ">Detailing</li>
              <li className="text-black ">Diagnostics</li>
            </ul>
          </div>
          <div className="mt-4 sm:mt-0">
            <h4 className="text-md md:text-lg font-semibold mb-3 md:mb-4">
              Contact
            </h4>
            <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-black ">
              <li>רמת גן</li>
              <li>ישראל</li>
              <li>054-4777469</li>
              <li>dr@keshevplus.co.il</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-black ">
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} כל הזכויות שמורות לקשב פלוס{' '}
          </p>
        </div>
      </div>
    </footer>
  );
}
