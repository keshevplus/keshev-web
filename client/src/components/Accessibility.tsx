import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Icons (using emoji as placeholders - replace with proper SVG icons in production)
const ICONS = {
  accessibility: '♿',
  brightness: '☀️',
  contrast: '◐',
  textSize: 'Aa',
  readableFont: 'Fa',
  links: '🔗',
  close: '✕',
};

interface AccessibilityState {
  highContrast: boolean;
  largeText: boolean;
  readableFont: boolean;
  highlightLinks: boolean;
}

const Accessibility: React.FC = () => {
  const { t } = useTranslation('accessibility');
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilityState>({
    highContrast: false,
    largeText: false,
    readableFont: false,
    highlightLinks: false,
  });

  // Toggle the menu open/closed
  const toggleMenu = () => setIsOpen(!isOpen);

  // Toggle individual accessibility settings
  const toggleSetting = (setting: keyof AccessibilityState) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));

    // Apply the setting to the document
    applyAccessibilitySettings({ ...settings, [setting]: !settings[setting] });
  };

  // Apply all accessibility settings to the document
  const applyAccessibilitySettings = (currentSettings: AccessibilityState) => {
    const docElement = document.documentElement;
    
    // High contrast
    if (currentSettings.highContrast) {
      docElement.classList.add('high-contrast');
    } else {
      docElement.classList.remove('high-contrast');
    }
    
    // Large text
    if (currentSettings.largeText) {
      docElement.classList.add('large-text');
    } else {
      docElement.classList.remove('large-text');
    }
    
    // Readable font
    if (currentSettings.readableFont) {
      docElement.classList.add('readable-font');
    } else {
      docElement.classList.remove('readable-font');
    }
    
    // Highlight links
    if (currentSettings.highlightLinks) {
      docElement.classList.add('highlight-links');
    } else {
      docElement.classList.remove('highlight-links');
    }
  };

  return (
    <div className="accessibility-container">
      {/* Main accessibility button */}
      <button
        onClick={toggleMenu}
        className="accessibility-button"
        aria-expanded={isOpen}
        aria-label={t('toggleAccessibility')}
        title={t('accessibilityOptions')}
      >
        {ICONS.accessibility} נגישות
      </button>

      {/* Slide-in menu */}
      <div 
        className={`accessibility-menu ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('accessibilityMenu')}
      >
        <div className="accessibility-menu-header">
          <h2>{t('accessibilityTitle')}</h2>
          <button 
            onClick={toggleMenu} 
            aria-label={t('closeMenu')}
            className="close-button"
          >
            {ICONS.close}
          </button>
        </div>

        <div className="accessibility-options">
          {/* Contrast */}
          <button
            onClick={() => toggleSetting('highContrast')}
            className={`option-button ${settings.highContrast ? 'active' : ''}`}
            aria-pressed={settings.highContrast}
          >
            <span className="icon">{ICONS.contrast}</span>
            <span className="label">{t('highContrast')}</span>
          </button>

          {/* Text Size */}
          <button
            onClick={() => toggleSetting('largeText')}
            className={`option-button ${settings.largeText ? 'active' : ''}`}
            aria-pressed={settings.largeText}
          >
            <span className="icon">{ICONS.textSize}</span>
            <span className="label">{t('largeText')}</span>
          </button>

          {/* Readable Font */}
          <button
            onClick={() => toggleSetting('readableFont')}
            className={`option-button ${settings.readableFont ? 'active' : ''}`}
            aria-pressed={settings.readableFont}
          >
            <span className="icon">{ICONS.readableFont}</span>
            <span className="label">{t('readableFont')}</span>
          </button>

          {/* Highlight Links */}
          <button
            onClick={() => toggleSetting('highlightLinks')}
            className={`option-button ${settings.highlightLinks ? 'active' : ''}`}
            aria-pressed={settings.highlightLinks}
          >
            <span className="icon">{ICONS.links}</span>
            <span className="label">{t('highlightLinks')}</span>
          </button>
        </div>
      </div>

      {/* Add styles for the accessibility features */}
      <style>{`
        /* Base styles for the accessibility button and menu */
        .accessibility-container {
          position: relative;
          z-index: 1000;
        }

        .accessibility-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0056b3;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .accessibility-button:hover {
          background: #003d7a;
        }

        .accessibility-menu {
          position: fixed;
          top: 0;
          right: -300px; /* Start off-screen */
          width: 300px;
          height: 100vh;
          background: white;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
          transition: right 0.3s ease-in-out;
          z-index: 1001;
          padding: 1rem;
          overflow-y: auto;
        }

        .accessibility-menu.open {
          right: 0;
        }

        .accessibility-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .accessibility-menu-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
        }

        .accessibility-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .option-button {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .option-button:hover {
          background: #f5f5f5;
        }

        .option-button.active {
          background: #e6f7ff;
          border-color: #1890ff;
        }

        .option-button .icon {
          margin-right: 0.75rem;
          font-size: 1.25rem;
        }

        /* Accessibility styles that get applied to the document */
        .high-contrast {
          filter: contrast(1.5);
        }

        .large-text {
          font-size: 120% !important;
        }

        .readable-font {
          font-family: Arial, sans-serif !important;
          line-height: 1.5 !important;
        }

        .highlight-links a {
          text-decoration: underline !important;
          color: #0000EE !important;
        }

        /* RTL support */
        html[dir="rtl"] .accessibility-menu {
          right: auto;
          left: -300px;
        }

        html[dir="rtl"] .accessibility-menu.open {
          right: auto;
          left: 0;
        }

        html[dir="rtl"] .option-button .icon {
          margin-right: 0;
          margin-left: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default Accessibility;
