import React from 'react';
import { useTranslation } from 'react-i18next';

// Basic styling for flags and container - consider moving to CSS file
const flagStyle: React.CSSProperties = {
  fontSize: '1.5rem', // Adjust size as needed
  cursor: 'pointer',
  margin: '0 0.5rem',
  display: 'inline-block',
};

const activeFlagStyle: React.CSSProperties = {
  ...flagStyle,
  opacity: 0.5, // Dim the non-active flag slightly
  cursor: 'default',
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (i18n.language !== lng) { // Only change if different
      i18n.changeLanguage(lng);
    }
  };

  return (
    <div>
      <span
        style={i18n.language === 'en' ? activeFlagStyle : flagStyle}
        onClick={() => changeLanguage('en')}
        role="button" // Semantics for clickability
        aria-label="Switch to English"
        aria-pressed={i18n.language === 'en'} // Indicate active state
      >
        🇬🇧
      </span>
      <span
        style={i18n.language === 'he' ? activeFlagStyle : flagStyle}
        onClick={() => changeLanguage('he')}
        role="button"
        aria-label="Switch to Hebrew"
        aria-pressed={i18n.language === 'he'}
      >
        🇮🇱
      </span>
    </div>
  );
};

export default LanguageSwitcher;
