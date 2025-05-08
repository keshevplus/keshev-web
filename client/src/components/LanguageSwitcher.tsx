import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  // Initialize language on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      document.documentElement.dir = savedLanguage === 'he' ? 'rtl' : 'ltr';
    }
  }, []);

  const changeLanguage = (lng: string) => {
    if (i18n.language !== lng) { // Only change if different
      console.log(`Language changed from ${i18n.language} to ${lng}`);
      i18n.changeLanguage(lng);
      
      // Set document direction based on language
      document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
      
      // Store language preference in localStorage
      localStorage.setItem('i18nextLng', lng);
      
      // Reload the page to ensure all components reflect the new language
      window.location.reload();
    }
  };

  return (
    <div className="language-switcher">
      <button
        className={`language-button ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
        aria-pressed={i18n.language === 'en'}
      >
        EN
      </button>
      <button
        className={`language-button ${i18n.language === 'he' ? 'active' : ''}`}
        onClick={() => changeLanguage('he')}
        aria-label="Switch to Hebrew"
        aria-pressed={i18n.language === 'he'}
      >
        עב
      </button>
    </div>
  );
};

export default LanguageSwitcher;
