import { useState, useEffect } from 'react';
import { PageContent } from '../types/content';
import { contentService } from '../services/contentService';

export function usePageData(page: string) {
  const [data, setData] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageData = await contentService.getPageContent(page);
        setData(pageData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { data, isLoading, error };
}
