import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { useTheme } from '../../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = 'text-green-800 hover:bg-green-800/10' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${className}`}
    >
      {isDark ? <IoSunnyOutline className="w-5 h-5" /> : <IoMoonOutline className="w-5 h-5" />}
    </button>
  );
}
