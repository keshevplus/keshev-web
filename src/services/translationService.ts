// Translation service to fetch translations from the API

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.keshevplus.co.il';
const TRANSLATIONS_API = `${API_BASE_URL}/translations`;

// Interface for language data
export interface Language {
  id: number;
  code: string;
  name: string;
  native_name: string;
  rtl: boolean;
  is_default: boolean;
}

/**
 * Fetch available languages from the API
 */
export const fetchAvailableLanguages = async (): Promise<Language[]> => {
  try {
    const response = await axios.get(`${TRANSLATIONS_API}/languages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available languages:', error);
    return [];
  }
};

/**
 * Fetch translations for a specific language and namespace
 * @param language Language code (e.g., 'en', 'he')
 * @param namespace Namespace name (e.g., 'common', 'forms')
 */
export const fetchTranslations = async (language: string, namespace: string): Promise<Record<string, string>> => {
  try {
    const response = await axios.get(`${TRANSLATIONS_API}/resources/${language}/${namespace}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching translations for ${language}/${namespace}:`, error);
    return {};
  }
};

/**
 * Fetch translations for multiple namespaces at once
 * @param language Language code
 * @param namespaces Array of namespace names
 */
export const fetchMultipleNamespaces = async (
  language: string, 
  namespaces: string[]
): Promise<Record<string, Record<string, string>>> => {
  try {
    const response = await axios.get(
      `${TRANSLATIONS_API}/resources/${language}?namespaces=${namespaces.join(',')}`
    );
    return response.data;
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
