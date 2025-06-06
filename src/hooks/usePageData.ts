import { useState, useEffect } from 'react';
import { contentService } from '../types/content';
import { ContentItem } from '../types/content';

export function usePageData(page: string): [ContentItem | null, boolean, Error?] {
  const [data, setData] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    contentService
      .getPageContent(page)
      .then(items => setData(items[0] ?? null))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [page]);

  return [data, loading, error];
}