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
import VideoBG from './ui/VideoBG'; // Background video component

export default function Navbar() {
  const dispatch = useDispatch(); // Dispatch function for Redux actions
  const { isHomePage, isScrolled, isMenuOpen } = useSelector(
    (state: RootState) => state.sharedState // Selecting shared state from Redux store
  );
  const location = useLocation(); // Current location object from React Router

  // Effect to update state based on scroll position and current route
  useEffect(() => {
    dispatch(setIsHomePage(location.pathname === '/')); // Check if the current page is the homepage
    const handleScroll = () => {
      dispatch(setIsScrolled(window.scrollY > 200)); // Update scroll state if scrolled more than 200px
    };
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, [location.pathname, dispatch]);

  // Function to check if a navigation item is active
  const isActive = (path: string) => location.pathname === path;

  // Navigation items for the navbar
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
        isScrolled ? 'mt-2 py-0 shadow-md' : ' pt-6'
      }`}
    >
      {/* Conditionally render background video for non-home pages */}
      {!isHomePage ? <VideoBG /> : ''}
      <div className="container mx-auto px-4 max-w-3xl">
        <div
          className={`flex flex-auto items-center ${
            isHomePage ? 'justify-between' : 'justify-end'
          } ${isScrolled ? 'mt-6' : 'mt-2'}`}
        >
          {/* Logo - visible on all pages */}
          <Link to="/" className="flex items-center flex-auto justify-self-end">
            <img
              src="\assets\images\logo.png"
              alt="קשב"
              className={`z-50 left-0 right-0 py-2 ${
                isHomePage && isMenuOpen && !isScrolled
                  ? 'visible w-40 scale-100'
                  : isHomePage && isScrolled
                  ? 'visible w-40 scale-100'
                  : isHomePage && !isScrolled
                  ? 'w-40 invisible md:scale-110'
                  : !isHomePage && !isScrolled
                  ? 'visible w-40 scale-125'
                  : 'w-40 visible scale-110'
              } hover:opacity-80 hover:scale-125 transform transition-transform duration-300 ease-in-out`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex text-nowrap justify-center items-center w-full">
            {navItems
              .filter((item) => !item.mobileOnly) // Exclude mobile-only items
              .map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xl mx-1 px-4 py-1 rounded-lg transition-all duration-200 font-semibold ${
                    isActive(item.path)
                      ? 'bg-green-800 text-white'
                      : 'text-green-600 hover:bg-green-800/90 hover:text-white'
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
            onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))} // Toggle menu state
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed left-0 right-0 ${
          isHomePage ? 'top-[0px]' : 'top-[0px]'
        } z-3 transition-all duration-300 ease-in-out transform 
      bg-green-800/95 ${
        isMenuOpen
          ? 'translate-y-0 opacity-100 relative'
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
                onClick={() => dispatch(setIsMenuOpen(false))} // Close menu on navigation
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
