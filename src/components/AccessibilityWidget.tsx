import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/accessibility.css';

interface AccessibilityState {
  fontSize: number;
  contrast: number;
  lineHeight: number;
}

const AccessibilityIcon: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'he';
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilityState>({
    fontSize: 100, // 100% is normal
    contrast: 100, // 100% is normal
    lineHeight: 1.5, // 1.5 is normal
  });

  // Apply RTL/LTR direction to the document on language change
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }, [isRTL]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const adjustFontSize = (increment: number) => {
    const newSize = Math.min(Math.max(settings.fontSize + increment, 100), 150);
    setSettings({ ...settings, fontSize: newSize });
    document.documentElement.style.setProperty('--accessibility-font-size', `${newSize}%`);
  };

  const adjustContrast = (increment: number) => {
    const newContrast = Math.min(Math.max(settings.contrast + increment, 100), 150);
    setSettings({ ...settings, contrast: newContrast });
    document.documentElement.style.setProperty('--accessibility-contrast', `${newContrast}%`);
  };

  const adjustLineHeight = (increment: number) => {
    const newLineHeight = Math.min(Math.max(settings.lineHeight + increment, 1.5), 2.5);
    setSettings({ ...settings, lineHeight: newLineHeight });
    document.documentElement.style.setProperty('--accessibility-line-height', `${newLineHeight}`);
  };

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 100,
      contrast: 100,
      lineHeight: 1.5,
    };
    setSettings(defaultSettings);
    document.documentElement.style.setProperty('--accessibility-font-size', '100%');
    document.documentElement.style.setProperty('--accessibility-contrast', '100%');
    document.documentElement.style.setProperty('--accessibility-line-height', '1.5');
  };

  return (
    <div className="accessibility-widget">
      <button 
        onClick={toggleMenu} 
        className="accessibility-toggle" 
        aria-expanded={isOpen}
        aria-label={t('common:accessibility')}
      >
        ♿
      </button>

      {isOpen && (
        <div className={`accessibility-menu ${isOpen ? 'open' : ''}`}>
          <div className="accessibility-header">
            <h2>{isRTL ? 'נגישות' : 'Accessibility'}</h2>
            <button onClick={toggleMenu} aria-label="Close">
              ✕
            </button>
          </div>
          <div className="accessibility-content">
            <div className="accessibility-section">
              <button onClick={() => adjustFontSize(5)} aria-label="Increase font size">
                <span className="accessibility-icon">A+</span>
                <span>{isRTL ? 'הגדל טקסט' : 'Larger Text'}</span>
              </button>
              <button onClick={() => adjustFontSize(-5)} aria-label="Decrease font size">
                <span className="accessibility-icon">A-</span>
                <span>{isRTL ? 'הקטן טקסט' : 'Smaller Text'}</span>
              </button>
            </div>

            <div className="accessibility-section">
              <button onClick={() => adjustContrast(5)} aria-label="Increase contrast">
                <span className="accessibility-icon">◐+</span>
                <span>{isRTL ? 'הגבר ניגודיות' : 'Higher Contrast'}</span>
              </button>
              <button onClick={() => adjustContrast(-5)} aria-label="Decrease contrast">
                <span className="accessibility-icon">◐-</span>
                <span>{isRTL ? 'הפחת ניגודיות' : 'Lower Contrast'}</span>
              </button>
            </div>

            <div className="accessibility-section">
              <button onClick={() => adjustLineHeight(0.1)} aria-label="Increase line spacing">
                <span className="accessibility-icon">≡+</span>
                <span>{isRTL ? 'הגדל רווח בין שורות' : 'Increase Line Spacing'}</span>
              </button>
              <button onClick={() => adjustLineHeight(-0.1)} aria-label="Decrease line spacing">
                <span className="accessibility-icon">≡-</span>
                <span>{isRTL ? 'הקטן רווח בין שורות' : 'Decrease Line Spacing'}</span>
              </button>
            </div>

            <button onClick={resetSettings} className="accessibility-reset">
              {isRTL ? 'איפוס הגדרות' : 'Reset Settings'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityIcon;