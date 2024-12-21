'use client';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-600 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </div>
            <div className="text-2xl font-bold text-white">AWB</div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;