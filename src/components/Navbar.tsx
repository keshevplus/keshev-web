import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/about', text: 'אודותינו' },
    { path: '/services', text: 'שירותינו' },
    { path: '/adhd', text: 'מהי ADHD?' },
    { path: '/diagnosis', text: 'תהליך האבחון' },
    { path: '/treatment', text: 'טיפול' },
    { path: '/contact', text: 'יצירת קשר' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="\assets\images\logo.png"
              alt="קשב"
              className="left-0 right-0 h-20 w-auto scale-150"
            />
          </Link>
          <Link
            to="tel:0544777469"
            className="bg-[green] text-white hover:bg-[darkgreen] transition-colors px-4 py-2 rounded-lg text-lg"
          >
            התקשרו עכשיו 054-4777469
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-black hover:text-[green] hover:underline transition-colors px-3 py-2 text-lg ${
                  isActive(item.path) ? 'text-[green]' : ''
                }`}
              >
                {item.text}
              </Link>
            ))}
          </div>

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
        <div className="lg:hidden bg-black/95 absolute top-20 left-0 right-0">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-white hover:text-[#FF4D4D] transition-colors px-3 py-2 text-lg ${
                    isActive(item.path) ? 'text-[#FF4D4D]' : ''
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
