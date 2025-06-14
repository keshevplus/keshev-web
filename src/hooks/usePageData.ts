<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import { ContentItem } from "../types/content";

export function usePageData(pageName: string) {
  const [data, setData] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);


        const module = await import(`../data/${pageName}Page.ts`);
        setData([module.default]); // Wrap in array since we expect LocalPageContent[]
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading page data:", err);
        setError("Failed to load page content");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageName]);

  return { data, isLoading, error };
}
// NOTE: This hook serves as a fallback when the DATABASE_URL environment variable is not set.
// In production, it is recommended to use the DATABASE_URL to fetch content from the Neon database.
// Additionally, in the admin dashboard, the content fetched by this hook will be editable.
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
