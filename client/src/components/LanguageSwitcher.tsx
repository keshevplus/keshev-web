import React from 'react';
import { useTranslation } from 'react-i18next';

const switcherStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  fontSize: '0.9rem',
  position: 'fixed',
  bottom: '20px',
  zIndex: 50,
};

const languageButtonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.7)',
  border: '1px solid #ccc',
  transition: 'all 0.2s ease',
};

const activeButtonStyle: React.CSSProperties = {
  ...languageButtonStyle,
  background: 'rgba(200, 200, 200, 0.7)',
  cursor: 'default',
  fontWeight: 'bold',
};

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'he';

  const changeLanguage = (lng: string) => {
    if (i18n.language !== lng) { // Only change if different
      console.log(`Language changed from ${i18n.language} to ${lng}`);
      i18n.changeLanguage(lng);
      // Set document direction based on language
      document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
    }
  };

  const containerStyle: React.CSSProperties = {
    ...switcherStyle,
    left: isRTL ? '20px' : 'auto',
    right: isRTL ? 'auto' : '20px',
  };

  return (
    <div style={containerStyle}>
      <button
        style={i18n.language === 'en' ? activeButtonStyle : languageButtonStyle}
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
        aria-pressed={i18n.language === 'en'}
      >
        {t('language.english')}
      </button>
      <button
        style={i18n.language === 'he' ? activeButtonStyle : languageButtonStyle}
        onClick={() => changeLanguage('he')}
        aria-label="Switch to Hebrew"
        aria-pressed={i18n.language === 'he'}
      >
        {t('language.hebrew')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
