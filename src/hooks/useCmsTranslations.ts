import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchTranslations } from '../services/cms';

// Text content is admin-managed on the keshevplus platform CMS and shared
// across keshevplus.com and keshev-web (same clinic, same content). Falls
// back to the provided default when a key isn't set or the fetch fails, so
// pages never show blank/missing text. Plain fetch + local state rather than
// react-query, since this project doesn't have that dependency installed.
export function useCmsTranslations() {
  const { i18n } = useTranslation();
  const language = i18n.language || 'he';
  const [data, setData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchTranslations(language).then((result) => {
      if (!cancelled) setData(result);
    });
    return () => {
      cancelled = true;
    };
  }, [language]);

  const t = (key: string, fallback: string): string => {
    const value = data?.[key];
    return value && value.trim() !== '' ? value : fallback;
  };

  return { t, ready: !!data };
}
