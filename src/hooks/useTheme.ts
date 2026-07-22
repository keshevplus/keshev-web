import { useEffect, useState } from 'react';

const STORAGE_KEY = 'kp_theme';

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  } catch {
    return false;
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDark]);

  return { isDark, toggleTheme: () => setIsDark((d) => !d) };
}
