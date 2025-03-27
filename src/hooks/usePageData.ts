import { useState, useEffect } from 'react';
import { PageContent } from '../types/content';

export function usePageData(pageName: string) {
  const [data, setData] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Import dynamically from the data directory
        const module = await import(`../data/${pageName}.ts`);
        setData(module.default);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading page data:', err);
        setError('Failed to load page content');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageName]);

  return { data, isLoading, error };
}
