import React, { useState, useEffect } from 'react';
import '../styles/accessibility-widget.css';
import { IoClose } from 'react-icons/io5';

const AccessibilityWidget: React.FC = () => {
  // Prevent duplicate widgets (singleton pattern)
  if (typeof window !== 'undefined') {
    if ((window as any).__accessibility_widget_rendered) {
      return null;
    }
    (window as any).__accessibility_widget_rendered = true;
  }
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
    readingGuide.className = 'reading-guide';
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
        html {
          filter: invert(100%) !important;
        }
        img, video, canvas, svg, [style*="background-image"] {
          filter: invert(100%) !important;
        }
      `;
      document.head.appendChild(style);
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
        html {
          filter: grayscale(100%) !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Apply big cursor
  const applyBigCursor = (big: boolean) => {
    if (big) {
      document.body.classList.add('big-cursor');
    } else {
      document.body.classList.remove('big-cursor');
    }
  };

  // Apply reading guide
  const applyReadingGuide = (show: boolean) => {
    const readingGuide = document.getElementById('reading-guide-element');
    if (!readingGuide) return;

    if (show) {
      readingGuide.style.display = 'block';
      document.addEventListener('mousemove', moveReadingGuide);
    } else {
      readingGuide.style.display = 'none';
      document.removeEventListener('mousemove', moveReadingGuide);
    }
  };

  // Move reading guide with mouse
  const moveReadingGuide = (e: MouseEvent) => {
    const readingGuide = document.getElementById('reading-guide-element');
    if (readingGuide) {
      readingGuide.style.top = `${e.clientY - 6}px`;
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
    <div className={`accessibility-widget-fixed${menuOpen ? ' menu-open' : ' menu-closed'}`}> 
      <button
        className="accessibility-button"
        onClick={toggleMenu}
        aria-label="תפריט נגישות"
      >
        <span role="img" aria-label="נגישות" style={{ fontSize: 35 }}>♿️</span>
      </button>
      {menuOpen && (
        <div className="accessibility-menu open">
          <button
            className="reset-button"
            onClick={resetSettings}
            style={{ display: Object.values(settings).some(Boolean) ? 'block' : 'none' }}
          >
            איפוס הגדרות
          </button>
          <button
            className="close-button"
            onClick={toggleMenu}
            aria-label="סגור תפריט נגישות"
          >
            <IoClose size={28} />
          </button>
          <div className="menu-items">
            <button
              className={`menu-item ${settings.textSize > 0 ? 'active' : ''}`}
              onClick={() => updateSetting('textSize', settings.textSize + 1)}
            >
              הגדל טקסט
            </button>
            <button
              className={`menu-item ${settings.textSize < 0 ? 'active' : ''}`}
              onClick={() => updateSetting('textSize', settings.textSize - 1)}
            >
              הקטן טקסט
            </button>
            <button
              className={`menu-item ${settings.textSpacing > 0 ? 'active' : ''}`}
              onClick={() => updateSetting('textSpacing', settings.textSpacing + 1)}
            >
              הגדל מרווח
            </button>
            <button
              className={`menu-item ${settings.textSpacing < 0 ? 'active' : ''}`}
              onClick={() => updateSetting('textSpacing', settings.textSpacing - 1)}
            >
              הקטן מרווח
            </button>
            <button
              className={`menu-item ${settings.lineHeight > 0 ? 'active' : ''}`}
              onClick={() => updateSetting('lineHeight', settings.lineHeight + 1)}
            >
              הגדל גובה שורה
            </button>
            <button
              className={`menu-item ${settings.lineHeight < 0 ? 'active' : ''}`}
              onClick={() => updateSetting('lineHeight', settings.lineHeight - 1)}
            >
              הקטן גובה שורה
            </button>
            <button
              className={`menu-item ${settings.invertColors ? 'active' : ''}`}
              onClick={() => updateSetting('invertColors', !settings.invertColors)}
            >
              הפוך צבעים
            </button>
            <button
              className={`menu-item ${settings.grayHues ? 'active' : ''}`}
              onClick={() => updateSetting('grayHues', !settings.grayHues)}
            >
              גווני אפור
            </button>
            <button
              className={`menu-item ${settings.bigCursor ? 'active' : ''}`}
              onClick={() => updateSetting('bigCursor', !settings.bigCursor)}
            >
              סמן גדול
            </button>
            <button
              className={`menu-item ${settings.readingGuide ? 'active' : ''}`}
              onClick={() => updateSetting('readingGuide', !settings.readingGuide)}
            >
              מדריך קריאה
            </button>
            <button
              className={`menu-item ${settings.disableAnimations ? 'active' : ''}`}
              onClick={() => updateSetting('disableAnimations', !settings.disableAnimations)}
            >
              בטל אנימציות
            </button>
          </div>
        </div>
      )}  
    </div>
  );
}

export default AccessibilityWidget;
