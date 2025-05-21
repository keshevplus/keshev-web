/**
 * This file serves as an example for using translations across your codebase
 * Follow this pattern to implement consistent translations throughout your site
 */

import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { TRANSLATION_KEYS, NAMESPACES } from './translations';

/**
 * Example component demonstrating best practices for using translations
 */
const TranslationExample: React.FC = () => {
  // Initialize translations with the right namespace
  // You can also pass multiple namespaces as an array if needed
  const { t, currentLanguage, changeLanguage } = useTranslations(NAMESPACES.COMMON);

  // Example of handling a language change
  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
  };

  return (
    <div className="translation-example">
      {/* Using translations with type-safe keys */}
      <h1>{t(TRANSLATION_KEYS.common.welcome)}</h1>
      
      {/* Using translations with nested keys */}
      <p>{t(TRANSLATION_KEYS.common.footer.animated.title)}</p>
      
      {/* Using translations with interpolation */}
      <p>
        {t('dynamic_welcome', 'Welcome, {{name}}!', {
          name: 'User',
        })}
      </p>
      
      {/* Language switcher example */}
      <div className="language-switcher">
        <button onClick={() => handleLanguageChange('he')} className={currentLanguage === 'he' ? 'active' : ''}>
          עברית
        </button>
        <button onClick={() => handleLanguageChange('en')} className={currentLanguage === 'en' ? 'active' : ''}>
          English
        </button>
      </div>
    </div>
  );
};

export default TranslationExample;
