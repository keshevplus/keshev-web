// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // For navigation and location tracking
import { IoMenu, IoClose } from 'react-icons/io5'; // Icons for menu toggle
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks for state management
import { RootState } from '../store/store'; // Root state type for Redux
import {
  setIsMenuOpen,
  setIsScrolled,
  setIsHomePage,
} from '../store/sharedStateSlice'; // Redux actions for shared state
import LanguageSwitcher from './LanguageSwitcher'; // Language Switcher component
import FloatingPhoneNumber from './FloatingPhoneNumber';
import { useTranslation } from 'react-i18next';

export const navItems = [
  { path: '/', text: 'בית', mobileOnly: true },
  { path: '/about', text: 'אודותינו' },
  { path: '/services', text: 'שירותינו' },
  { path: '/adhd', text: 'מהי ADHD?' },
  { path: '/diagnosis', text: 'תהליך האבחון' },
  { path: '/forms', text: 'שאלונים' },
  { path: '/contact', text: 'יצירת קשר' },
];

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  
  // Replace the destructuring with safe access to prevent errors when sharedState is undefined
  const sharedState = useSelector((state: RootState) => state.sharedState);
  const isHomePage = sharedState?.isHomePage || false;
  const isScrolled = sharedState?.isScrolled || false;
  const isMenuOpen = sharedState?.isMenuOpen || false;
  
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

  // Wrap authentication checks in a safe try/catch
  const checkAuthentication = async () => {
    try {
      // Use a safe check that doesn't rely on authenticatedRequest being available
      const token = localStorage.getItem('token');
      const isLoggedIn = !!token; // Simple check based on token presence
    } catch (error) {
      console.error("Error checking authentication status:", error);
    }
  };

  useEffect(() => {
    // Call authentication check after a slight delay to ensure services are initialized
    const timer = setTimeout(() => {
      checkAuthentication();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[50] transition-shadow duration-300 rtl ${
        isScrolled ? 'shadow-md bg-white/95 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >

    <div className="relative w-full bg-[url('/assets/images/bgvideogif.gif')">
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
          {/* Controls wrapper - contains both language switcher and phone icon */}
          <div className="flex items-center justify-center h-12">
            {/* Language Switcher in Navbar */}
            <div className="navbar-language-switcher flex items-center justify-center h-full mr-3">
              <LanguageSwitcher />
            </div>
            {/* Phone icon wrapper */}
            <div className="navbar-item flex items-center justify-center h-full">
              <a href="tel:055-27-399-27" className="flex items-center justify-center h-full">
                <img
                  src="/assets/images/greenphone.svg"
                  alt="Call Now"
                  className="h-6 hover:opacity-80 transition-transform duration-300"
                />
                <FloatingPhoneNumber />
              </a>
            </div>
          </div>
          {/* Hamburger menu button */}
          <button
            className="lg:hidden text-black h-12 flex items-center justify-center"
            onClick={() => dispatch(setIsMenuOpen(!isMenuOpen))}
          >
            {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>
    </div>

      <div
        className={`lg:hidden fixed inset-0 transition-all duration-300 ${
          isMenuOpen
            ? 'opacity-100 z-[100] block'
            : 'hidden'
        }`}
      >
        <div className="flex flex-col h-screen">
          {/* Dimmed background overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10"></div>
          
          {/* Menu header with close button */}
          <div className="bg-green-800 py-4 px-6 flex justify-between items-center">
            <span className="text-white text-2xl font-bold items-center">תפריט</span>
            <button
              className="text-white p-2"
              onClick={() => dispatch(setIsMenuOpen(false))}
            >
              <IoClose size={28} />
            </button>
          </div>
          
          {/* Menu items - flex-grow to take remaining height */}
          <div className="flex-grow bg-green-800/95 overflow-y-auto py-6 px-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xl font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ${
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
          
          {/* Footer area */}
          <div className="bg-green-900 py-4 px-6 text-center">
            <a href="tel:055-27-399-27" className="text-white text-lg font-semibold">
              התקשרו: 055-27-399-27
            </a>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
