// Translation service to fetch translations from the API

import axios from 'axios';

// Define the Language interface
export interface Language {
  code: string;
  name: string;
  native_name?: string;
  is_default?: boolean;
  rtl?: boolean; // Add the rtl property
}

// Define the TranslationKey interface
export interface TranslationKey {
  namespace: string;
  key: string;
  translations: Record<string, string>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';

// Metadata for languages the platform's /api/settings/language endpoint may
// report as enabled; it only returns codes, so display info is looked up here.
const LANGUAGE_META: Record<string, { name: string; native_name: string; rtl: boolean }> = {
  he: { name: 'Hebrew', native_name: 'עברית', rtl: true },
  en: { name: 'English', native_name: 'English', rtl: false },
  fr: { name: 'French', native_name: 'Français', rtl: false },
  es: { name: 'Spanish', native_name: 'Español', rtl: false },
  de: { name: 'German', native_name: 'Deutsch', rtl: false },
  ru: { name: 'Russian', native_name: 'Русский', rtl: false },
  am: { name: 'Amharic', native_name: 'አማርኛ', rtl: false },
  ar: { name: 'Arabic', native_name: 'العربية', rtl: true },
  yi: { name: 'Yiddish', native_name: 'ייִדיש', rtl: true },
  it: { name: 'Italian', native_name: 'Italiano', rtl: false },
};

export async function fetchAvailableLanguages(): Promise<Language[]> {
  try {
    const response = await axios.get<{ enabledLanguages: string[]; defaultLanguage: string }>(
      `${API_BASE_URL}/api/settings/language`
    );
    const { enabledLanguages, defaultLanguage } = response.data;
    return enabledLanguages.map((code) => ({
      code,
      name: LANGUAGE_META[code]?.name || code,
      native_name: LANGUAGE_META[code]?.native_name,
      is_default: code === defaultLanguage,
      rtl: LANGUAGE_META[code]?.rtl || false,
    }));
  } catch (err) {
    console.error('Error fetching available languages:', err);
    throw err;
  }
}

export async function fetchTranslationKeys(namespace: string): Promise<TranslationKey[]> {
  const response = await axios.get<TranslationKey[]>(`${API_BASE_URL}/translations/${namespace}`);
  return response.data;
}

export async function saveTranslation(
  key: TranslationKey,
  languageCode: string
): Promise<void> {
  await axios.post(`${API_BASE_URL}/translations/update`, {
    languageCode,
    namespace: key.namespace,
    key: key.key,
    translation: key.translations[languageCode]
  });
}

/**
 * Fetch the full flat key->value translation map for a language.
 * @param language Language code (e.g., 'en', 'he')
 */
export const fetchTranslations = async (language: string): Promise<Record<string, string>> => {
  const response = await axios.get(`${API_BASE_URL}/api/translations`, { params: { lang: language } });
  return response.data;
};

/**
 * Fetch translations for multiple namespaces at once. The platform stores
 * translations as a single flat key->value map per language (no namespace
 * split), so every requested namespace gets the same full map back; lookups
 * only ever use the keys they need.
 * @param language Language code
 * @param namespaces Array of namespace names
 */
export const fetchMultipleNamespaces = async (
  language: string,
  namespaces: string[]
): Promise<Record<string, Record<string, string>>> => {
  try {
    const flat = await fetchTranslations(language);
    const result: Record<string, Record<string, string>> = {};
    namespaces.forEach((ns) => {
      result[ns] = flat;
    });
    return result;
  } catch (error) {
    console.error(`Error fetching multiple namespaces for ${language}:`, error);
    // Return empty objects for each namespace
    const result: Record<string, Record<string, string>> = {};
    namespaces.forEach(ns => {
      result[ns] = {};
    });
    return result;
  }
};

/**
 * Fallback to get offline translations (for initial load or if API fails)
 * @param language Language code
 * @param namespace Namespace name
 */
export const getOfflineTranslations = async (language: string, namespace: string): Promise<Record<string, string>> => {
  try {
    // Attempt to fetch from local JSON files (stored in public/locales)
    const response = await fetch(`/locales/${language}/${namespace}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load offline translations for ${language}/${namespace}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading offline translations for ${language}/${namespace}:`, error);
    return {};
  }
};

/**
 * Initialize translations - tries to fetch from API first, falls back to offline
 * @param language Language code
 * @param namespaces Array of namespace names
 */
export const initializeTranslations = async (
  language: string,
  namespaces: string[]
): Promise<Record<string, Record<string, string>>> => {
  try {
    // Try to fetch from API first
    const apiTranslations = await fetchMultipleNamespaces(language, namespaces);

    // Check if we got actual translations (not just empty objects)
    const hasTranslations = Object.values(apiTranslations).some(
      ns => Object.keys(ns).length > 0
    );

    if (hasTranslations) {
      return apiTranslations;
    }

    // If API fails or returns empty, fallback to offline files
    console.log('Falling back to offline translations');
    const offlineTranslations: Record<string, Record<string, string>> = {};

    for (const namespace of namespaces) {
      offlineTranslations[namespace] = await getOfflineTranslations(language, namespace);
    }

    return offlineTranslations;
  } catch (error) {
    console.error('Error initializing translations:', error);

    // Last resort fallback
    const fallbackTranslations: Record<string, Record<string, string>> = {};
    for (const namespace of namespaces) {
      fallbackTranslations[namespace] = {};
    }

    return fallbackTranslations;
  }
};
