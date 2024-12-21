'use client';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative h-8 w-8 rounded-lg bg-blue-800/40 hover:bg-blue-700/40 transition-colors duration-200 flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <div className="relative text-lg">
        <span 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isDark ? 'opacity-100 transform rotate-0' : 'opacity-0 transform rotate-90'
          }`}
        >
          🌙
        </span>
        <span 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            !isDark ? 'opacity-100 transform rotate-0' : 'opacity-0 transform -rotate-90'
          }`}
        >
          ☀️
        </span>
      </div>
    </button>
  );
};