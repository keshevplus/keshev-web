import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initializeTranslations, fetchAvailableLanguages } from '../services/translationService';

// List of namespaces we use in the application
const namespaces = ['common', 'accessibility', 'navigation', 'forms', 'home', 'admin'];

// Initialize i18next instance
i18n
  // Load translations from backend (our API)
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
    debug: import.meta.env.NODE_ENV === 'development',
    // Load multiple languages
    supportedLngs: ['he', 'en'],
    // Namespaces to use
    ns: namespaces,
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
    // Custom backend options to load translations from our API
    backend: {
      // Override the loadPath to use our custom load function
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Fallback path if API fails
      // Custom load function that uses our translationService
      load: async (languages: string | string[], namespaces: string | string[], callback: (err: any, data: any) => void) => {
        try {
          console.log(`Loading translations for languages: ${languages}, namespaces: ${namespaces}`);
          const language = Array.isArray(languages) ? languages[0] : languages;
          const namespace = Array.isArray(namespaces) ? namespaces[0] : namespaces;
          
          // Use our translationService to get translations from API with fallback
          const translations = await initializeTranslations(language, [namespace]);
          callback(null, translations[namespace] || {});
        } catch (err) {
          console.error('Error loading translations:', err);
          callback(err, null);
        }
      }
    }
  });

// Function to load available languages from the API
export const loadAvailableLanguages = async () => {
  try {
    const languages = await fetchAvailableLanguages();
    // Update supportedLngs dynamically based on what's available
    if (languages.length > 0) {
      const langCodes = languages.map(lang => lang.code);
      i18n.options.supportedLngs = langCodes;
      
      // Set the default language based on the API response
      const defaultLang = languages.find(lang => lang.is_default);
      if (defaultLang) {
        i18n.options.fallbackLng = defaultLang.code;
      }
      
      console.log('Supported languages updated:', langCodes);
    }
  } catch (err) {
    console.error('Error loading available languages:', err);
  }
};

// Load languages when the app starts
loadAvailableLanguages();

export default i18n;
