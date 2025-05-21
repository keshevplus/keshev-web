import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the supported languages
export type Language = 'he' | 'en';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create translations for both languages
const translations: Record<Language, Record<string, string>> = {
  he: {
    'admin.title': 'אזור ניהול',
    'admin.email': 'כתובת אימייל',
    'admin.password': 'סיסמה',
    'admin.login': 'התחבר',
    'admin.logging_in': 'מתחבר...',
    'admin.authorized_only': 'הכניסה מורשית לאנשי הנהלה בלבד',
    'admin.show_password': 'הצג סיסמה',
    'admin.hide_password': 'הסתר סיסמה',
  },
  en: {
    'admin.title': 'Admin Area',
    'admin.email': 'Email Address',
    'admin.password': 'Password',
    'admin.login': 'Log In',
    'admin.logging_in': 'Logging in...',
    'admin.authorized_only': 'Access restricted to administration only',
    'admin.show_password': 'Show password',
    'admin.hide_password': 'Hide password',
  },
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'he',
  setLanguage: () => {},
  t: () => '',
});

// Create a provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to Hebrew as it appears to be the primary language in the current UI
  const [language, setLanguage] = useState<Language>('he');

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
