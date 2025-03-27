import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', text: 'בית', mobileOnly: true },
    { path: '/about', text: 'אודותינו' },
    { path: '/services', text: 'שירותינו' },
    { path: '/adhd', text: 'מהי ADHD?' },
    { path: '/diagnosis', text: 'תהליך האבחון' },
    { path: '/forms', text: 'שאלונים' },
    { path: '/contact', text: 'יצירת קשר' },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-end h-full">
          {/* Logo */}
          <Link to="/" className="flex items-start">
            <img
              src="\assets\images\logo.png"
              alt="קשב"
              className="left-0 right-0 h-40 w-auto scale-75 hover:opacity-80 hover:scale-90 transform transition-transform duration-300 ease-in-out"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex text-nowrap">
            {navItems
              .filter((item) => !item.mobileOnly)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xl mx-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-green-800 text-white'
                      : 'text-black hover:bg-green-800/90 hover:text-white'
                  }`}
                >
                  {item.text}
                </Link>
              ))}
          </div>
          <div className="navbar-item">
            <img
              src="/assets/images/green-phone.svg"
              alt="Call Now"
              className="green-phone-icon w-16 mx-10 hover:opacity-80 hover:scale-130 transform transition-transform duration-300 "
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-black p-8"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed left-0 right-0 top-[160px] z-50 transition-all duration-300 ease-in-out transform 
        bg-green-800/95 ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto p-5">
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-black text-4xl font-bold hover:text-orange-400 transition-colors px-3 py-2 ${
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
    </nav>
  );
}
