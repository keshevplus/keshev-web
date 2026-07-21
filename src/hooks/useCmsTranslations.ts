import { useQuery } from '@tanstack/react-query';
import { fetchTranslations } from '../services/cms';

// Text content is admin-managed on the keshevplus platform CMS and shared
// across keshevplus.com and this site (same clinic, same content). Falls
// back to the provided default when a key isn't set or the fetch fails, so
// pages never show blank/missing text.
export function useCmsTranslations() {
  const { data } = useQuery({
    queryKey: ['cms-translations', 'he'],
    queryFn: () => fetchTranslations('he'),
  });

  const t = (key: string, fallback: string): string => {
    const value = data?.[key];
    return value && value.trim() !== '' ? value : fallback;
  };

  return { t, ready: !!data };
}
