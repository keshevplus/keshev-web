import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchTranslations } from '../services/cms';

// Text content is admin-managed on the keshevplus platform CMS and shared
// across keshevplus.com and this site (same clinic, same content). Falls
// back to the provided default when a key isn't set or the fetch fails, so
// pages never show blank/missing text. Follows the active i18next language
// so the language switcher actually changes page content, not just chrome.
export function useCmsTranslations() {
  const { i18n } = useTranslation();
  const language = i18n.language || 'he';
  const { data } = useQuery({
    queryKey: ['cms-translations', language],
    queryFn: () => fetchTranslations(language),
  });

  const t = (key: string, fallback: string): string => {
    const value = data?.[key];
    return value && value.trim() !== '' ? value : fallback;
  };

  return { t, ready: !!data };
}
