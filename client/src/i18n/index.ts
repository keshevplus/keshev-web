import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Initialize i18next instance
i18n
  // Load translations from /public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize configuration
  .init({
    // Default language
    fallbackLng: 'he',
    // Debug in development
    debug: process.env.NODE_ENV === 'development',
    // Load multiple languages
    supportedLngs: ['he', 'en'],
    // Namespaces to use
    ns: ['common', 'accessibility', 'navigation', 'forms', 'home'],
    defaultNS: 'common',
    // Cache languages in browser localStorage
    cache: {
      enabled: true,
      expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    interpolation: {
      // React already protects from XSS
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
