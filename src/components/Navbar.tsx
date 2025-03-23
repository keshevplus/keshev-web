import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', text: 'בית' },
    { path: '/about', text: 'אודותינו' },
    { path: '/services', text: 'שירותינו' },
    { path: '/adhd', text: 'מהי ADHD?' },
    { path: '/diagnosis', text: 'תהליך האבחון' },
    { path: '/forms', text: 'שאלונים' },
    { path: '/contact', text: 'יצירת קשר' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto pt-0 px-4">
        <div className="flex items-center justify-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-start">
            <img
              src="\assets\images\logo.png"
              alt="קשב"
              className="left-0 right-0 h-40 w-auto scale-75"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-black hover:bg-green-800 border- hover:text-white hover:animate-pulse transition-colors px-3 py-2 text-lg ${
                  isActive(item.path) ? 'text-[green]' : ''
                }`}
              >
                {item.text}
              </Link>
            ))}
          </div>
          <Link
            to="tel:0544777469"
            className="bg-[green] text-white max-w-20 hover:bg-[darkgreen] transition-colors px-4 py-2 rounded-lg text-lg"
          >
            התקשרו עכשיו 054-4777469
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-black p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-green-900/95 absolute top-20 my-10 left-0 right-0">
          <div className="container mx-auto p-5">
            <div className="flex-auto flex flex-col items-center space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-white text-6xl font-bold hover:text-[#FF4D4D] transition-colors px-3 py-2 ${
                    isActive(item.path) ? 'text-[orange-400]' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
