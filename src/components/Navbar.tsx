// Importing necessary libraries and components
import { Link, useLocation } from 'react-router-dom'; // For navigation and location tracking
import { IoMenu, IoClose } from 'react-icons/io5'; // Icons for menu toggle
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks for state management
import { RootState } from '../store/store'; // Root state type for Redux
import {
  setIsMenuOpen,
  setIsScrolled,
  setIsHomePage,
} from '../store/sharedStateSlice'; // Redux actions for shared state
import { useEffect } from 'react'; // React hook for side effects
import LanguageSwitcher from './LanguageSwitcher'; // Language Switcher component

export const navItems = [
  { path: '/', text: 'בית', mobileOnly: true },
  { path: '/about', text: 'אודותינו' },
  { path: '/services', text: 'שירותינו' },
  { path: '/adhd', text: 'מהי ADHD?' },
  { path: '/diagnosis', text: 'תהליך האבחון' },
  { path: '/forms', text: 'שאלונים' },
  { path: '/contact', text: 'יצירת קשר' },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { isHomePage, isScrolled, isMenuOpen } = useSelector(
    (state: RootState) => state.sharedState
  );
  const location = useLocation();

  useEffect(() => {
    dispatch(setIsHomePage(location.pathname === '/'));
    const handleScroll = () => {
      const scrollY = window.scrollY;
      dispatch(setIsScrolled(scrollY > 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, dispatch]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-[50] transition-shadow duration-300 rtl ${
        isScrolled ? 'shadow-md bg-white/95 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >

    {!isHomePage}

      <div className="relative bg-[url(/assets/images/bgvideogif.gif)]">
        <div className="container bg-white/70 px-4 max-w-3xl flex items-center justify-between relative backdrop-blur-sm ">
          <Link
            to="/"
            className={`flex items-center transition-opacity duration-300 ${
              isHomePage && !isScrolled ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex items-center ">
              <img
                src="/assets/images/logo.png"
                alt="קשב"
                className="object-contain w-40 transition-transform duration-300 hover:opacity-80"
              />
            </div>
          </Link>
          <div className="hidden lg:flex space-x-4 mx-4 ">
            {navItems
              .filter((item) => !item.mobileOnly)
              .map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xl font-semibold ${
                    isActive(item.path)
                      ? 'bg-green-800 text-white'
                      : 'bg-white/20 text-green-600 hover:bg-green-800 hover:text-white'
                  } px-4 py-2 rounded-lg ${index === 0 ? 'mx-4' : ''}`}
                >
                  {item.text}
                </Link>
              ))}
          </div>
          <div className="flex items-center space-x-3">
            {/* Language Switcher in Navbar */}
            <div className="navbar-language-switcher">
              <LanguageSwitcher />
            </div>
            <div className="navbar-item">
              <img
                src="/assets/images/greenphone.svg"
                alt="Call Now"
                className="w-16 hover:opacity-80 transition-transform duration-300"
              />
            </div>
            <button
              className="lg:hidden text-black"
              onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}
            >
              {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed left-0 right-0 top-90 z-3 bg-green-800/95 transition-transform duration-300 ${
          isMenuOpen
            ? 'translate-y-0 opacity-100 overflow-y-auto relative'
            : 'translate-y-full opacity-0 overflow-y-hidden'
        }`}
      >
        <div className="container mx-auto py-4 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block text-xl font-semibold py-2 px-4 my-2 rounded-lg ${
                isActive(item.path)
                  ? 'bg-white text-green-800'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => dispatch(setIsMenuOpen(false))}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>

    </nav>
  );
}
