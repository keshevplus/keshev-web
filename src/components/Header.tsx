import { Link } from 'react-router-dom'; // Or your navigation library
import { PhoneIcon } from './PhoneIcon';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Keshev Logo" className="h-12 w-auto" />
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-gray-800 hover:text-green-800">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-800 hover:text-green-800"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/diagnosis"
                className="text-gray-800 hover:text-green-800"
              >
                Diagnosis
              </Link>
            </li>
            {/* Add other navigation links */}
          </ul>
        </nav>

        <div className="flex items-center">
          <a href="tel:+1234567890" className="flex items-center">
            <PhoneIcon className="w-5 h-5 phone-icon" />
            <span className="ml-2 text-gray-800">123-456-7890</span>
          </a>
        </div>
      </div>
    </header>
  );
}
