import React, { useState, useEffect, useRef } from 'react';
import './AccessibilityWidget.css';
import { IoClose } from 'react-icons/io5';
import { FaWheelchair } from 'react-icons/fa';

/**
 * AccessibilityWidget component - Compliant with Israeli Accessibility Regulations (Standard 5568)
 * Provides various accessibility features to improve website usability for users with disabilities
 */
const AccessibilityWidget: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    textSize: 0,
    textSpacing: 0,
    lineHeight: 0,
    invertColors: false,
    grayHues: false,
    bigCursor: false,
    readingGuide: false,
    disableAnimations: false
  });
  
  // Refs for click outside detection
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle clicks outside of the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen && 
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    // Apply accessibility settings from localStorage on mount
    const storedSettings = localStorage.getItem('accessibilitySettings');
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings));
        applyAllSettings(JSON.parse(storedSettings));
      } catch (e) {
        console.error('Error parsing accessibility settings:', e);
      }
    }

    // Create reading guide element
    const readingGuide = document.createElement('div');
    readingGuide.id = 'reading-guide-element';
    readingGuide.className = 'readingGuide';
    document.body.appendChild(readingGuide);

    return () => {
      // Clean up on unmount
      const readingGuideElement = document.getElementById('reading-guide-element');
      if (readingGuideElement) {
        document.body.removeChild(readingGuideElement);
      }
      document.removeEventListener('mousemove', moveReadingGuide);
    };
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    applyAllSettings(settings);
  }, [settings]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const updateSetting = (setting: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const applyAllSettings = (currentSettings: typeof settings) => {
    applyTextSize(currentSettings.textSize);
    applyTextSpacing(currentSettings.textSpacing);
    applyLineHeight(currentSettings.lineHeight);
    applyInvertColors(currentSettings.invertColors);
    applyGrayHues(currentSettings.grayHues);
    applyBigCursor(currentSettings.bigCursor);
    applyReadingGuide(currentSettings.readingGuide);
    applyDisableAnimations(currentSettings.disableAnimations);
  };

  const resetSettings = () => {
    setSettings({
      textSize: 0,
      textSpacing: 0,
      lineHeight: 0,
      invertColors: false,
      grayHues: false,
      bigCursor: false,
      readingGuide: false,
      disableAnimations: false
    });
  };

  // Apply text size changes
  const applyTextSize = (size: number) => {
    const styleId = 'accessibility-text-size';
    removeExistingStyle(styleId);

    if (size !== 0) {
      const factor = size * 0.05; // 5% change per step
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        html:not(.accessibility-menu *):not(.accessibility-button) {
          font-size: calc(1em + ${factor}em) !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Apply text spacing changes
  const applyTextSpacing = (spacing: number) => {
    const styleId = 'accessibility-text-spacing';
    removeExistingStyle(styleId);

    if (spacing !== 0) {
      const factor = spacing * 0.25; // 0.25px change per step
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        body:not(.accessibility-menu), body:not(.accessibility-menu) *:not(.accessibility-menu):not(.accessibility-menu *):not(.accessibility-button) {
          letter-spacing: ${factor}px !important;
          word-spacing: calc(0.16em + ${factor}px) !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Apply line height changes
  const applyLineHeight = (height: number) => {
    const styleId = 'accessibility-line-height';
    removeExistingStyle(styleId);

    if (height !== 0) {
      const factor = 1 + height * 0.05; // 5% change per step
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        body:not(.accessibility-menu), body:not(.accessibility-menu) *:not(.accessibility-menu):not(.accessibility-menu *):not(.accessibility-button) {
          line-height: ${factor} !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Apply color inversion
  const applyInvertColors = (invert: boolean) => {
    const styleId = 'accessibility-invert-colors';
    removeExistingStyle(styleId);

    if (invert) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        html:not(.accessibility-menu):not(.accessibility-menu *):not(.accessibility-button) {
          filter: invert(100%) hue-rotate(180deg) !important;
        }
        img:not(.accessibility-menu img), video:not(.accessibility-menu video) {
          filter: invert(100%) hue-rotate(180deg) !important;
        }
      `;
      document.head.appendChild(style);
      document.documentElement.style.backgroundColor = '#fff';
    } else {
      document.documentElement.style.backgroundColor = '';
    }
  };

  // Apply gray hues
  const applyGrayHues = (gray: boolean) => {
    const styleId = 'accessibility-gray-hues';
    removeExistingStyle(styleId);

    if (gray) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        html:not(.accessibility-menu):not(.accessibility-menu *):not(.accessibility-button) {
          filter: grayscale(100%) !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Apply big cursor
  const applyBigCursor = (big: boolean) => {
    if (big) {
      document.body.classList.add('bigCursor');
    } else {
      document.body.classList.remove('bigCursor');
    }
  };

  // Apply reading guide
  const applyReadingGuide = (show: boolean) => {
    const readingGuideElement = document.getElementById('reading-guide-element');
    if (!readingGuideElement) return;

    if (show) {
      readingGuideElement.style.display = 'block';
      document.addEventListener('mousemove', moveReadingGuide);
    } else {
      readingGuideElement.style.display = 'none';
      document.removeEventListener('mousemove', moveReadingGuide);
    }
  };

  // Move reading guide with mouse
  const moveReadingGuide = (e: MouseEvent) => {
    const readingGuideElement = document.getElementById('reading-guide-element');
    if (readingGuideElement) {
      readingGuideElement.style.top = `${e.clientY}px`;
    }
  };

  // Apply disable animations
  const applyDisableAnimations = (disable: boolean) => {
    const styleId = 'accessibility-disable-animations';
    removeExistingStyle(styleId);

    if (disable) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        * {
          animation: none !important;
          transition: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Remove existing style element by id
  const removeExistingStyle = (id: string) => {
    const existingStyle = document.getElementById(id);
    if (existingStyle) {
      existingStyle.remove();
    }
  };

  return (
    <div className="accessibilityContainer" dir="rtl">
      <div className="accessibilityButtonGroup">
        <button
          ref={buttonRef}
          className="accessibilityButton"
          onClick={toggleMenu}
          aria-label="פתח תפריט נגישות"
          aria-expanded={menuOpen}
          title="הצהרת נגישות"
        >
          <div className="wheelchairIconContainer">
            <FaWheelchair size={20} aria-hidden="true" />
          </div>
          <span className="accessibilityText">נגישות</span>
        </button>
        <button
          className="resetAccessibilityButton"
          onClick={resetSettings}
          aria-label="איפוס כל הגדרות נגישות"
          title="איפוס כל הגדרות נגישות"
          style={{ 
            display: Object.values(settings).some(Boolean) ? 'flex' : 'none',
            opacity: menuOpen ? 1 : 0.1 
          }}
        >
          <span className="resetText">איפוס</span>
        </button>
      </div>

      {menuOpen && (
        <div ref={menuRef} className="menu" role="dialog" aria-label="תפריט נגישות">
          <div className="menuHeader">
            <h2>הצהרת נגישות</h2>
            <div className="headerButtons">
              <button
                className="resetButton"
                onClick={resetSettings}
                style={{ display: Object.values(settings).some(Boolean) ? 'block' : 'none' }}
                aria-label="איפוס כל הגדרות הנגישות"
              >
                איפוס הגדרות
              </button>
              <button
                className="closeButton"
                onClick={toggleMenu}
                aria-label="סגור תפריט נגישות"
              >
                <IoClose size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
          
          <div className="accessibilityStatement">
            <p>
              אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013
            </p>
          </div>

          <button
            className={`menuItem ${settings.textSize > 0 ? 'active' : ''}`}
            onClick={() => updateSetting('textSize', settings.textSize + 1)}
          >
            הגדל טקסט
          </button>
          <button
            className={`menuItem ${settings.textSize < 0 ? 'active' : ''}`}
            onClick={() => updateSetting('textSize', settings.textSize - 1)}
          >
            הקטן טקסט
          </button>

          <button
            className={`menuItem ${settings.textSpacing > 0 ? 'active' : ''}`}
            onClick={() => updateSetting('textSpacing', settings.textSpacing + 1)}
          >
            הגדל מרווח
          </button>
          <button
            className={`menuItem ${settings.textSpacing < 0 ? 'active' : ''}`}
            onClick={() => updateSetting('textSpacing', settings.textSpacing - 1)}
          >
            הקטן מרווח
          </button>

          <button
            className={`menuItem ${settings.lineHeight > 0 ? 'active' : ''}`}
            onClick={() => updateSetting('lineHeight', settings.lineHeight + 1)}
          >
            הגדל גובה שורה
          </button>
          <button
            className={`menuItem ${settings.lineHeight < 0 ? 'active' : ''}`}
            onClick={() => updateSetting('lineHeight', settings.lineHeight - 1)}
          >
            הקטן גובה שורה
          </button>

          <button
            className={`menuItem ${settings.invertColors ? 'active' : ''}`}
            onClick={() => updateSetting('invertColors', !settings.invertColors)}
          >
            הפוך צבעים
          </button>

          <button
            className={`menuItem ${settings.grayHues ? 'active' : ''}`}
            onClick={() => updateSetting('grayHues', !settings.grayHues)}
          >
            גווני אפור
          </button>

          <button
            className={`menuItem ${settings.bigCursor ? 'active' : ''}`}
            onClick={() => updateSetting('bigCursor', !settings.bigCursor)}
          >
            סמן גדול
          </button>

          <button
            className={`menuItem ${settings.readingGuide ? 'active' : ''}`}
            onClick={() => updateSetting('readingGuide', !settings.readingGuide)}
          >
            מדריך קריאה
          </button>

          <button
            className={`menuItem ${settings.disableAnimations ? 'active' : ''}`}
            onClick={() => updateSetting('disableAnimations', !settings.disableAnimations)}
          >
            בטל אנימציות
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;
