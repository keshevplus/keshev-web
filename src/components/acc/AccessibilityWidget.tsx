import React, { useState, useEffect, useRef } from 'react';
import './AccessibilityWidget.css';
import { IoClose } from 'react-icons/io5';
import { FaWheelchair } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  type AccessibilitySettings,
  defaultAccessibilitySettings,
  applyAllAccessibilitySettings,
  cleanupReadingGuideListener,
} from './accessibilitySettings';

/**
 * AccessibilityWidget component - Compliant with Israeli Accessibility Regulations (Standard 5568)
 * Provides various accessibility features to improve website usability for users with disabilities
 */
const AccessibilityWidget: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultAccessibilitySettings);

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
        const parsed = JSON.parse(storedSettings);
        setSettings(parsed);
        applyAllAccessibilitySettings(parsed);
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
      cleanupReadingGuideListener();
    };
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    applyAllAccessibilitySettings(settings);
  }, [settings]);

  const toggleMenu = () => {
    setMenuOpen(open => !open);
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(setting: K, value: AccessibilitySettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const resetSettings = () => {
    setSettings(defaultAccessibilitySettings);
  };

  // detect if all settings are at default (0 or false)
  const isDefault = Object.values(settings).every(v => v === 0 || v === false);

  return (
    <div className={`accessibilityContainer${menuOpen ? ' open' : ''}`} dir="rtl">
      <div className="accessibilityButtonGroup">
        <button
          ref={buttonRef}
          className="accessibilityButton"
          type="button"
          onClick={toggleMenu}
          aria-label="פתח תפריט נגישות"
          aria-expanded={menuOpen}
          title="תפריט נגישות"
        >
          <FaWheelchair size={24} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={menuRef}
        className="menu accessibility-menu"
        role="dialog"
        aria-label="תפריט נגישות"
      >
        {/* Reset button—hidden when all defaults */}
        <button
          className="resetButton"
          style={{ display: isDefault ? 'none' : 'block' }}
          onClick={resetSettings}
          aria-label="איפוס כל הגדרות הנגישות"
        >
          איפוס הגדרות
        </button>

        <div className="menuHeader whitespace-nowrap">
          <h2>תפריט נגישות</h2>
          <div className="headerButtons">
            <button
              className="closeButton"
              onClick={toggleMenu}
              aria-label="סגור תפריט נגישות"
            >
              <IoClose size={24} aria-hidden="true" />
            </button>
          </div>
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

        <div className="menuLink md:text-sm" style={{ marginBottom: '12px' }}>
          <Link to="/accessibility">לצפיה בהצהרת הנגישות</Link>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityWidget;
