// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // For navigation and location tracking
import { IoMenu, IoClose, IoCalendarOutline } from 'react-icons/io5'; // Icons for menu toggle
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks for state management
import { RootState } from '../store/store'; // Root state type for Redux
import {
  setIsMenuOpen,
  setIsScrolled,
} from '../store/sharedStateSlice'; // Redux actions for shared state

// import LanguageSwitcher from './LanguageSwitcher'; // Language Switcher component

import FloatingPhoneNumber from '../components/ui/FloatingPhoneNumber';
import BookingModal from '../components/BookingModal';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useCmsTranslations } from '../hooks/useCmsTranslations';
import { ROUTE_BY_SECTION, sectionKeyForPath, useAllSectionIds, type SectionKey } from '../lib/sectionSlugs';

export function useNavItems() {
  const { t } = useCmsTranslations();
  return [
    { path: ROUTE_BY_SECTION.home, text: t('nav.home', 'בית'), mobileOnly: true },
    { path: ROUTE_BY_SECTION.about, text: t('nav.about', 'אודותינו') },
    { path: ROUTE_BY_SECTION.services, text: t('nav.services', 'שירותינו') },
    { path: ROUTE_BY_SECTION.adhd, text: t('nav.adhd', 'מהי ADHD') },
    { path: ROUTE_BY_SECTION.diagnosis, text: t('nav.diagnosis', 'תהליך האבחון') },
    { path: ROUTE_BY_SECTION.questionnaires, text: t('nav.questionnaires', 'שאלונים') },
    { path: ROUTE_BY_SECTION.contact, text: t('nav.contact', 'יצירת קשר') },
  ];
}

const NAV_HEIGHT = 80;

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useCmsTranslations();
  const navItems = useNavItems();
  const sectionIds = useAllSectionIds();
  const [activeSection, setActiveSection] = useState<SectionKey>('home');
  const [bookingOpen, setBookingOpen] = useState(false);

  // Replace the destructuring with safe access to prevent errors when sharedState is undefined
  const sharedState = useSelector((state: RootState) => state.sharedState);
  const isScrolled = sharedState?.isScrolled || false;
  const isMenuOpen = sharedState?.isMenuOpen || false;

  const location = useLocation();
  // Every section route (/, /about, /services, ...) renders the same
  // one-page SPA; "isHomePage" here really means "on one of those routes".
  const isHomePage = sectionKeyForPath(location.pathname) !== null;

  const isActive = (path: string) => activeSection === sectionKeyForPath(path);

  const scrollToAnchor = (key: SectionKey) => {
    if (key === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionIds[key]);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavClick = (path: string) => (e: React.MouseEvent) => {
    const key = sectionKeyForPath(path);
    if (!key) return;
    e.preventDefault();
    // Every section route renders the same Home component, so this just
    // updates the URL (SEO/back-button/direct-link correctness) without
    // remounting anything, then scrolls to the anchor.
    navigate(path);
    scrollToAnchor(key);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      dispatch(setIsScrolled(scrollY > 100));

      if (!isHomePage) return;
      const threshold = NAV_HEIGHT + window.scrollY;
      let current: SectionKey = 'home';
      for (const key of Object.keys(sectionIds) as SectionKey[]) {
        const el = document.getElementById(sectionIds[key]);
        if (el && el.offsetTop <= threshold) current = key;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, sectionIds, dispatch]);

  // Landing directly on a section route (e.g. /about, or a direct link to
  // /contact) scrolls to that section once its content is mounted.
  useEffect(() => {
    const key = sectionKeyForPath(location.pathname);
    if (key && key !== 'home') {
      const timer = setTimeout(() => scrollToAnchor(key), 50);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Wrap authentication checks in a safe try/catch
  const checkAuthentication = async () => {
    try {
      // simple token presence check (no variable assignment needed)
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
      className={`sticky top-0 z-[50] transition-shadow duration-300 rtl ${isScrolled ? 'shadow-md bg-white/95 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-sm'
        }`}
    >

      <div className="relative w-full bg-[url('/assets/images/bgvideogif.gif')">
        <div className="container bg-white/70 px-4 max-w-3xl flex items-center justify-between relative backdrop-blur-sm ">
          <Link
            to="/"
            onClick={handleNavClick('/')}
            className={`flex items-center transition-opacity duration-300 ${isHomePage && !isScrolled ? 'opacity-0' : 'opacity-100'
              }`}
          >
            <div className="flex items-center ">
              <img
                src="/assets/images/logoSVG.svg"
                alt="קשב"
                className={`object-contain w-40 transition-all duration-700 hover:opacity-80 ${isHomePage && isScrolled ? 'opacity-0' : 'opacity-100'
                  }`}
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
                  onClick={handleNavClick(item.path)}
                  className={`text-xl font-semibold px-4 py-2 rounded-lg transition-colors duration-200 ${isActive(item.path)
                    ? 'bg-green-600 text-white' // Active link has green background and white text
                    : 'text-green-800 hover:text-white hover:bg-green-600' // Inactive link behavior
                    } ${index === 0 ? 'mx-4' : ''}`}
                >
                  {item.text}
                </Link>
              ))}
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-green-800 hover:bg-green-700 text-white font-bold px-4 py-2 text-sm"
            >
              <IoCalendarOutline className="w-4 h-4" />
              {t('nav.book_now', 'קביעת תור')}
            </button>
            {/* Desktop-only controls: language + theme, kept off the tighter mobile/tablet bar */}
            <div className="hidden lg:flex items-center gap-2 h-12">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            {/* Controls wrapper - contains both language switcher and phone icon */}
            <div className="flex items-center justify-center h-12 mx-4">
              {/* Phone icon wrapper */}
              <div className="navbar-item flex items-center justify-center h-full">
                <Link
                  to={`tel:${t('contact.phone', '055-27-399-27').replace(/-/g, '')}`}
                  className="flex items-center justify-center h-full text-green-600 font-bold"
                >                <span className="ml-2 whitespace-nowrap">
                    <FloatingPhoneNumber />
                  </span>

                  <img
                    src="/assets/images/greenphone.svg"
                    alt="Call Now"
                    className="h-6 hover:opacity-80 transition-transform duration-300"
                  />

                </Link>
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
        className={`lg:hidden fixed inset-0 transition-all duration-300 ${isMenuOpen
          ? 'opacity-100 z-[100] block'
          : 'hidden'
          }`}
      >
        <div className="flex flex-col h-screen">
          {/* Dimmed background overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10"></div>

          {/* Menu header with close button */}
          <div className="bg-green-800 py-4 px-6 flex justify-between items-center">
            <span className="text-white text-2xl font-bold items-center">{t('nav.menu', 'תפריט')}</span>
            <button
              className="text-white p-2"
              onClick={() => dispatch(setIsMenuOpen(false))}
            >
              <IoClose size={28} />
            </button>
          </div>

          {/* Menu items - flex-grow to take remaining height */}
          <div className="flex-grow bg-green-800/95 overflow-y-auto px-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xl font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ${isActive(item.path)
                    ? 'bg-green-500 text-white' // Active link in mobile menu
                    : 'text-white hover:bg-green-600'
                    }`}
                  onClick={(e) => {
                    handleNavClick(item.path)(e);
                    dispatch(setIsMenuOpen(false));
                  }}
                >
                  {item.text}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => { setBookingOpen(true); dispatch(setIsMenuOpen(false)); }}
                className="flex items-center justify-center gap-2 rounded-full bg-white text-green-800 font-bold py-3 mt-2"
              >
                <IoCalendarOutline className="w-5 h-5" />
                {t('nav.book_now', 'קביעת תור')}
              </button>
              <div className="flex items-center justify-center gap-3 pt-2">
                <LanguageSwitcher />
                <ThemeToggle className="text-white hover:bg-white/10" />
              </div>
            </div>
          </div>

          {/* Footer area */}
          <div className="bg-green-900 py-4 px-6 text-center">
            <Link to={`tel:${t('contact.phone', '055-27-399-27').replace(/-/g, '')}`} className="text-white text-lg font-semibold">
              {t('nav.call_us', 'התקשרו: 055-27-399-27')}
            </Link>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </nav>
  );
};

export default Navbar;
