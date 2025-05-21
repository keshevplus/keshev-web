import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

// Import the i18n instance to ensure it's initialized
import '../i18n';

/**
 * Custom hook for translations that ensures i18n is properly initialized
 * @param {string} namespace - The translation namespace to use (defaults to 'common')
 * @returns {object} The translation functions and utilities
 */
export const useTranslations = (namespace = 'common') => {
  const { t, i18n, ready } = useTranslation(namespace);

  // Log when translations are ready or when there are errors
  useEffect(() => {
    if (ready) {
      console.debug(`Translations for namespace '${namespace}' ready, current language: ${i18n.language}`);
    }
  }, [ready, namespace, i18n.language]);

  // Handle translation errors gracefully
  const safeT = (key: string, defaultValue?: string, options?: Record<string, any>) => {
    // If key starts with namespace, don't add namespace again
    const fullKey = key.includes('.') ? key : `${key}`;
    
    try {
      // Use correct parameter types for i18next t function
      return t(fullKey, { defaultValue: defaultValue || key, ...options });
    } catch (error) {
      console.warn(`Translation error for key '${fullKey}':`, error);
      return defaultValue || key;
    }
  };

  return {
    t: safeT,
    i18n,
    ready,
    changeLanguage: i18n.changeLanguage,
    currentLanguage: i18n.language
  };
};
