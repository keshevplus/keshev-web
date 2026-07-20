import { useState, useEffect } from 'react';
import type { PageType } from '../types/pages';
import { API_URL } from '../config/constants';

export function usePageData<T = unknown>(endpoint: PageType) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/api/content/page/${endpoint}`)
      .then(res => res.json())
      .then(json => { setData(json); setIsLoading(false); })
      .catch((e: Error) => { setError(e.message); setIsLoading(false); });
  }, [endpoint]);

  return { data, isLoading, error };
}
