import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchTranslations } from '../services/cms';

// Text content is admin-managed on the keshevplus platform CMS and shared
// across keshevplus.com and this site (same clinic, same content). Falls
// back to the provided default when a key isn't set or the fetch fails, so
// pages never show blank/missing text. Follows the active i18next language
// so the language switcher actually changes page content, not just chrome.
export function useCmsTranslations() {
  const { i18n, t: i18nextT } = useTranslation();
  const language = i18n.language || 'he';
  const { data } = useQuery({
    queryKey: ['cms-translations', language],
    queryFn: () => fetchTranslations(language),
  });

  const t = (key: string, fallback: string): string => {
    // An admin-saved empty string is a deliberate "leave this blank", not
    // "not customized yet" - only fall back when the key was never saved.
    if (data && key in data) return data[key];
    const local = i18nextT(key, { defaultValue: '' });
    if (local) return local;
    return fallback;
  };

  return { t, ready: !!data };
}
