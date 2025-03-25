import { useState, useEffect } from 'react';
import { PageContent } from '../types/content';
import { contentService } from '../services/contentService';

export function usePageData(page: string) {
  const [data, setData] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await contentService.getPageContent(page);
        setData(response);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    }
    fetchData();
  }, [page]);

  return { data, isLoading, error };
}
