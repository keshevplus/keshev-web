/**
 * Centralized translation keys for better organization and type safety
 * This makes it easier to maintain translations and prevents typos
 */

export const TRANSLATION_KEYS = {
  common: {
    welcome: 'welcome',
    loading: 'loading',
    error: 'error',
    success: 'success',
    save: 'save',
    cancel: 'cancel',
    close: 'close',
    search: 'search',
    language: 'language',
    login: 'login',
    logout: 'logout',
    yes: 'yes',
    no: 'no',
    back: 'back',
    footer: {
      animated: {
        title: 'footer.animated.title',
        tagline: 'footer.animated.tagline',
        cta: 'footer.animated.cta'
      }
    }
  },
  admin: {
    title: 'title',
    email: 'email',
    password: 'password',
    login: 'login',
    loggingIn: 'logging_in',
    authorizedOnly: 'authorized_only',
    showPassword: 'show_password',
    hidePassword: 'hide_password',
    dashboard: 'dashboard',
    users: 'users',
    settings: 'settings',
    welcome: 'welcome_admin',
    lastLogin: 'last_login'
  },
  navigation: {
    home: 'home',
    about: 'about',
    services: 'services',
    adhd: 'adhd',
    diagnosis: 'diagnosis',
    forms: 'forms',
    contact: 'contact'
  },
  home: {
    hero: {
      title: 'hero.title',
      subtitle: 'hero.subtitle',
      about: 'hero.about',
      contact: 'hero.contact'
    },
    cta: {
      title: 'cta.title',
      subtitle: 'cta.subtitle',
      button: 'cta.button'
    }
  }
};

/**
 * Translation namespaces used throughout the application
 */
export const NAMESPACES = {
  COMMON: 'common',
  ADMIN: 'admin',
  NAVIGATION: 'navigation',
  HOME: 'home',
  FORMS: 'forms',
  ACCESSIBILITY: 'accessibility'
};

/**
 * Helper function to get a fully qualified translation key with namespace
 * @param namespace The translation namespace
 * @param key The translation key within the namespace
 */
export const getTranslationKey = (namespace: string, key: string): string => {
  return `${namespace}:${key}`;
};
