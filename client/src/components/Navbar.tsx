import { Link, useLocation } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  setIsMenuOpen,
  setIsScrolled,
  setIsHomePage,
} from '../store/sharedStateSlice';
import { useEffect } from 'react';

export default function Navbar() {
  const dispatch = useDispatch();
  const { isHomePage, isScrolled, isMenuOpen } = useSelector(
    (state: RootState) => state.sharedState
  );
  const location = useLocation();

  useEffect(() => {
    dispatch(setIsHomePage(location.pathname === '/'));
    const handleScroll = () => {
      dispatch(setIsScrolled(window.scrollY > 200));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, dispatch]);

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
    <nav
      className={`sticky top-0 left-0 z-[50] bg-white/80 backdrop-blur-sm transition-all duration-300 ${
        isHomePage ? 'py-0' : 'py-0'
      }${isScrolled ? 'mt-1 py-0 shadow-md' : ' mt-8'}${
        isScrolled && isHomePage ? 'bg-white/80' : ''
      }`}
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <div
          className={`flex flex-auto items-center ${
            isHomePage ? 'justify-between' : 'justify-end'
          } ${isScrolled ? 'mt-4' : 'mt-8'}`}
        >
          {/* Logo - visible on all pages */}
          <Link to="/" className="flex items-center">
            <img
              src="\assets\images\logo.png"
              alt="קשב"
              className={`z-50 left-0 right-0 ml-48 ${
                isHomePage && isScrolled
                  ? 'w-40 scale-80'
                  : isHomePage && !isScrolled
                  ? 'w-0 scale-80'
                  : 'w-40 scale-80'
              } hover:opacity-80 hover:scale-120 transform transition-transform duration-300 ease-in-out`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex text-nowrap ">
            {navItems
              .filter((item) => !item.mobileOnly)
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xl mx-1 px-4 py-2 rounded-lg mb-2 transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-green-800 text-white'
                      : 'text-black hover:bg-green-800/90 hover:text-white'
                  }`}
                >
                  {item.text}
                </Link>
              ))}
          </div>

          {/* Phone Icon - visible on all pages */}
          <div className="navbar-item">
            <img
              src="/assets/images/green-phone.svg"
              alt="Call Now"
              className="green-phone-icon w-16 mx-10 hover:opacity-80 hover:scale-120 transform transition-transform duration-300"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-black p-8"
            onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed left-0 right-0 ${
          isHomePage ? 'top-[80px]' : 'top-[95px]'
        } z-3 transition-all duration-300 ease-in-out transform 
      bg-green-800/95 ${
        isMenuOpen
          ? 'translate-y-0 opacity-100 fixed top-0'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
      >
        <div className="container mx-auto p-5">
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white text-4xl font-bold hover:text-orange-400 transition-colors px-3 py-2 ${
                  isActive(item.path) ? 'text-[orange-400]' : ''
                }`}
                onClick={() => dispatch(setIsMenuOpen(false))}
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
