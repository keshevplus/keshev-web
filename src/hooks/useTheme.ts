import { useEffect, useState } from 'react';

const STORAGE_KEY = 'kp_theme';

function getInitialDark(): boolean {
  try {
    // Default to light regardless of OS preference - dark mode is opt-in
    // only, via the toggle, not automatic based on the visitor's system.
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'dark';
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
