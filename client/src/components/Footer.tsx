import { Link } from 'react-router-dom';
import Card from './ui/Card'; // Import the Card component

export default function Footer() {
  return (
    <footer className="bg-orange-400/35 hover:bg-orange-400/60 text-black pt-12 md:mt-12 mt-16">
      <div className="container mx-auto px-4 ">
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
            <p className="mt-4">
              <Link
                to="/admin"
                className="text-black hover:text-green-800 text-sm md:text-base"
              >
                Admin CMS Login
              </Link>
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
            <Card
              bgcolor="bg-orange-400/35"
              textColor="text-black"
              textSize="text-md md:text-lg"
              title="Services"
              description="Maintenance, Detailing, Diagnostics"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <Card
              bgcolor="bg-orange-400/35"
              textColor="text-black"
              textSize="text-md md:text-lg"
              title="Contact"
              description="Ramat Gan, Israel, 054-4777469, dr@keshevplus.co.il"
            />
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
