import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoGlobeOutline } from 'react-icons/io5';
import { fetchAvailableLanguages } from '../../services/translationService';

export interface LocalLanguage {
  id: number;
  code: string;
  name: string;
  native_name: string;
  is_default: boolean;
  rtl: boolean;
}

// Default fallback languages
const fallbackLanguages = [
  { id: 1, code: 'he', name: 'Hebrew', native_name: 'עברית', rtl: true, is_default: true },
  { id: 2, code: 'en', name: 'English', native_name: 'English', rtl: false, is_default: false }
];

interface LanguageSwitcherProps {
  className?: string;
}

// Compact globe-icon button that opens a small dropdown of languages -
// avoids a native <select> (which always shows the current language's text
// and doesn't fit alongside 6+ nav links) while keeping the same 10-language
// support and RTL-aware page reload on change.
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = 'text-green-800 hover:bg-green-800/10' }) => {
  const { i18n, t } = useTranslation('common');
  const [languages, setLanguages] = useState<LocalLanguage[]>(fallbackLanguages);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const langData = await fetchAvailableLanguages();
        if (Array.isArray(langData) && langData.length > 0) {
          setLanguages(langData.map(lang => ({
            id: 0,
            code: lang.code,
            name: lang.name,
            native_name: lang.native_name || lang.name,
            is_default: lang.is_default || false,
            rtl: lang.rtl || false
          })));
        }
      } catch (error) {
        console.error('Error loading languages:', error);
      }
    };
    loadLanguages();
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage) {
      document.documentElement.dir = savedLanguage === 'he' ? 'rtl' : 'ltr';
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const changeLanguage = (lng: string) => {
    setIsOpen(false);
    if (i18n.language === lng) return;
    i18n.changeLanguage(lng);
    const langInfo = languages.find(l => l.code === lng);
    const isRtl = langInfo ? langInfo.rtl : lng === 'he';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    localStorage.setItem('i18nextLng', lng);
    window.location.reload();
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={t('nav.change_language', 'החלף שפה')}
        aria-expanded={isOpen}
        className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${className}`}
      >
        <IoGlobeOutline className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute end-0 top-full mt-2 min-w-[8rem] bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-start px-3 py-2 text-sm transition-colors ${i18n.language === lang.code
                ? 'bg-green-600 text-white font-semibold'
                : 'text-gray-800 hover:bg-green-50'
                }`}
            >
              {lang.native_name || lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
