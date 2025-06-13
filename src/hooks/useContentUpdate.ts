// filepath: c:\KESHEVPLUS\20250601\keshev-web\src\hooks\useContentUpdate.ts
import { useState } from 'react';
import { API_URL } from '../config/constants';

interface ContentUpdateOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useContentUpdate = (pageType: string, options?: ContentUpdateOptions) => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Create simple error handler function
  const handleError = (error: Error | unknown) => {
    console.error('Error updating content:', error);
  };

  const updateContent = async (field: string, value: string) => {
    setIsUpdating(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/content/${pageType}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          field, 
          value,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update content');
      }

      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (error) {
      handleError(error);
      if (options?.onError) {
        options.onError(error instanceof Error ? error.message : String(error));
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateContent,
    isUpdating,
  };
};