import { useState } from 'react';

export function useErrorHandler() {
  const [error, setError] = useState<string | null>(null);

  const handleError = (callback: () => void) => {
    try {
      callback();
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    }
  };

  return { error, setError, handleError };
}