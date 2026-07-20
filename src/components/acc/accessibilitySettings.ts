export interface AccessibilitySettings {
  textSize: number;
  textSpacing: number;
  lineHeight: number;
  invertColors: boolean;
  grayHues: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
  disableAnimations: boolean;
}

export const defaultAccessibilitySettings: AccessibilitySettings = {
  textSize: 0,
  textSpacing: 0,
  lineHeight: 0,
  invertColors: false,
  grayHues: false,
  bigCursor: false,
  readingGuide: false,
  disableAnimations: false,
};

// Remove existing style element by id
const removeExistingStyle = (id: string) => {
  const existingStyle = document.getElementById(id);
  if (existingStyle) {
    existingStyle.remove();
  }
};

// Apply text size changes
const applyTextSize = (size: number) => {
  const styleId = 'accessibility-text-size';
  removeExistingStyle(styleId);

  if (size !== 0) {
    const factor = size * 0.01; // 5% change per step
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      *:not(.menu):not(.menu *):not(.menuHeader):not(.accessibility-button) {
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
      html:not(.menu):not(.menu *):not(.accessibility-button) {
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

// Move reading guide with mouse
const moveReadingGuide = (e: MouseEvent) => {
  const readingGuideElement = document.getElementById('reading-guide-element');
  if (readingGuideElement) {
    readingGuideElement.style.top = `${e.clientY}px`;
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

export const applyAllAccessibilitySettings = (settings: AccessibilitySettings) => {
  applyTextSize(settings.textSize);
  applyTextSpacing(settings.textSpacing);
  applyLineHeight(settings.lineHeight);
  applyInvertColors(settings.invertColors);
  applyGrayHues(settings.grayHues);
  applyBigCursor(settings.bigCursor);
  applyReadingGuide(settings.readingGuide);
  applyDisableAnimations(settings.disableAnimations);
};

export const cleanupReadingGuideListener = () => {
  document.removeEventListener('mousemove', moveReadingGuide);
};
