import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';
import { fetchAvailableLanguages, Language } from '../services/translationService';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation('common');
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Load available languages from API
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        setLoading(true);
        const langData = await fetchAvailableLanguages();
        if (langData.length > 0) {
          setLanguages(langData);
        } else {
          // Fallback if API fails
          setLanguages([
            { id: 1, code: 'he', name: 'Hebrew', native_name: 'עברית', rtl: true, is_default: true },
            { id: 2, code: 'en', name: 'English', native_name: 'English', rtl: false, is_default: false }
          ]);
        }
      } catch (error) {
        console.error('Error loading languages:', error);
        // Fallback languages if API fails
        setLanguages([
          { id: 1, code: 'he', name: 'Hebrew', native_name: 'עברית', rtl: true, is_default: true },
          { id: 2, code: 'en', name: 'English', native_name: 'English', rtl: false, is_default: false }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    loadLanguages();
  }, []);
  
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
      
      // Get language info to determine RTL
      const langInfo = languages.find(l => l.code === lng);
      const isRtl = langInfo ? langInfo.rtl : lng === 'he';
      
      // Set document direction based on language RTL property
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      
      // Store language preference in localStorage
      localStorage.setItem('i18nextLng', lng);
      
      // Reload the page to ensure all components reflect the new language
      window.location.reload();
    }
  };

  if (loading) {
    return <div className="language-switcher-loading">{t('loading', 'Loading...')}</div>;
  }

  return (
    <div className="language-switcher">
      {languages.map(lang => (
        <button
          key={lang.code}
          className={`language-button ${i18n.language === lang.code ? 'active' : ''}`}
          onClick={() => changeLanguage(lang.code)}
          aria-label={`Switch to ${lang.name}`}
          aria-pressed={i18n.language === lang.code}
          title={lang.name}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
