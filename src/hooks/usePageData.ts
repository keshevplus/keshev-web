import { useState, useEffect } from "react";
import { ContentItem } from "../types/content";

/**
 * Custom hook for fetching page content data
 * 
 * This hook dynamically imports page data from corresponding files in the data directory.
 * It serves as a client-side content management system for static page content.
 * 
 * @param {string} pageName - Name of the page to fetch data for (e.g., 'home', 'about')
 * @returns {object} - Object containing data array, loading state, and any error messages
 */
export function usePageData(pageName: string) {
  const [data, setData] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Asynchronously loads page content from the corresponding data file
     * File format follows the naming convention: [pageName]Page.ts
     */
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Dynamic import of the page data module
        const module = await import(`../data/${pageName}Page.ts`);

        // Module.default contains the page content as a single ContentItem object
        // We wrap it in an array to maintain consistency with the ContentItem[] type
        setData([module.default]);
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