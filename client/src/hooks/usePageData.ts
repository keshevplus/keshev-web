import { useState, useEffect } from 'react';
import { ContentItem } from '../types/content';

export function usePageData(pageName: string) {
  const [data, setData] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Import dynamically from the data directory with 'Page' suffix
        const module = await import(`../data/${pageName}Page.ts`);
        setData([module.default]); // Wrap in array since we expect LocalPageContent[]
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