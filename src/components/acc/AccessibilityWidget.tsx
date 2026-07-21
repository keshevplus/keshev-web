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
import { useTranslations } from '../../hooks/useTranslations';
import { useWidgetSettings } from '../../hooks/useWidgetSettings';

/**
 * AccessibilityWidget component - Compliant with Israeli Accessibility Regulations (Standard 5568)
 * Provides various accessibility features to improve website usability for users with disabilities
 */
const AccessibilityWidget: React.FC = () => {
  const { t } = useTranslations();
  const { showAccessibility } = useWidgetSettings();
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

  if (!showAccessibility) return null;

  return (
    <div className={`accessibilityContainer${menuOpen ? ' open' : ''}`} dir="rtl">
      <div className="accessibilityButtonGroup">
        <button
          ref={buttonRef}
          className="accessibilityButton"
          type="button"
          onClick={toggleMenu}
          aria-label={t('keshevweb.a11yWidget.openMenuAria')}
          aria-expanded={menuOpen}
          title={t('keshevweb.a11yWidget.menuTitle')}
        >
          <FaWheelchair size={24} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={menuRef}
        className="menu accessibility-menu"
        role="dialog"
        aria-label={t('keshevweb.a11yWidget.menuTitle')}
      >
        {/* Reset button—hidden when all defaults */}
        <button
          className="resetButton"
          style={{ display: isDefault ? 'none' : 'block' }}
          onClick={resetSettings}
          aria-label={t('keshevweb.a11yWidget.resetAria')}
        >
          {t('keshevweb.a11yWidget.resetButton')}
        </button>

        <div className="menuHeader whitespace-nowrap">
          <h2>{t('keshevweb.a11yWidget.menuTitle')}</h2>
          <div className="headerButtons">
            <button
              className="closeButton"
              onClick={toggleMenu}
              aria-label={t('keshevweb.a11yWidget.closeAria')}
            >
              <IoClose size={24} aria-hidden="true" />
            </button>
          </div>
        </div>

        <button
          className={`menuItem ${settings.textSize > 0 ? 'active' : ''}`}
          onClick={() => updateSetting('textSize', settings.textSize + 1)}
        >
          {t('keshevweb.a11yWidget.increaseText')}
        </button>
        <button
          className={`menuItem ${settings.textSize < 0 ? 'active' : ''}`}
          onClick={() => updateSetting('textSize', settings.textSize - 1)}
        >
          {t('keshevweb.a11yWidget.decreaseText')}
        </button>

        <button
          className={`menuItem ${settings.textSpacing > 0 ? 'active' : ''}`}
          onClick={() => updateSetting('textSpacing', settings.textSpacing + 1)}
        >
          {t('keshevweb.a11yWidget.increaseSpacing')}
        </button>
        <button
          className={`menuItem ${settings.textSpacing < 0 ? 'active' : ''}`}
          onClick={() => updateSetting('textSpacing', settings.textSpacing - 1)}
        >
          {t('keshevweb.a11yWidget.decreaseSpacing')}
        </button>

        <button
          className={`menuItem ${settings.lineHeight > 0 ? 'active' : ''}`}
          onClick={() => updateSetting('lineHeight', settings.lineHeight + 1)}
        >
          {t('keshevweb.a11yWidget.increaseLineHeight')}
        </button>
        <button
          className={`menuItem ${settings.lineHeight < 0 ? 'active' : ''}`}
          onClick={() => updateSetting('lineHeight', settings.lineHeight - 1)}
        >
          {t('keshevweb.a11yWidget.decreaseLineHeight')}
        </button>

        <button
          className={`menuItem ${settings.invertColors ? 'active' : ''}`}
          onClick={() => updateSetting('invertColors', !settings.invertColors)}
        >
          {t('keshevweb.a11yWidget.invertColors')}
        </button>

        <button
          className={`menuItem ${settings.grayHues ? 'active' : ''}`}
          onClick={() => updateSetting('grayHues', !settings.grayHues)}
        >
          {t('keshevweb.a11yWidget.grayHues')}
        </button>

        <button
          className={`menuItem ${settings.linkHighlight ? 'active' : ''}`}
          onClick={() => updateSetting('linkHighlight', !settings.linkHighlight)}
        >
          {t('keshevweb.a11yWidget.linkHighlight')}
        </button>

        <button
          className={`menuItem ${settings.readableFont ? 'active' : ''}`}
          onClick={() => updateSetting('readableFont', !settings.readableFont)}
        >
          {t('keshevweb.a11yWidget.readableFont')}
        </button>

        <button
          className={`menuItem ${settings.bigCursor ? 'active' : ''}`}
          onClick={() => updateSetting('bigCursor', !settings.bigCursor)}
        >
          {t('keshevweb.a11yWidget.bigCursor')}
        </button>

        <button
          className={`menuItem ${settings.readingGuide ? 'active' : ''}`}
          onClick={() => updateSetting('readingGuide', !settings.readingGuide)}
        >
          {t('keshevweb.a11yWidget.readingGuide')}
        </button>

        <button
          className={`menuItem ${settings.disableAnimations ? 'active' : ''}`}
          onClick={() => updateSetting('disableAnimations', !settings.disableAnimations)}
        >
          {t('keshevweb.a11yWidget.disableAnimations')}
        </button>

        <div className="menuLink md:text-sm" style={{ marginBottom: '12px' }}>
          <Link to="/accessibility">{t('keshevweb.a11yWidget.statementLink')}</Link>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityWidget;
