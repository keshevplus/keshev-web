import { useState, useEffect } from 'react';
import type { PageType } from '../types/pages';

export function usePageData<T = any>(endpoint: PageType) {
  const [data, setData] = useState<T[]|null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/content/page/${endpoint}`)
      .then(res => res.json())
      .then(json => { setData(json); setIsLoading(false); })
      .catch(e => { setError(e.message); setIsLoading(false); });
  }, [endpoint]);

  return { data, isLoading, error };
}