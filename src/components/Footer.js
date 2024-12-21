'use client';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 dark:from-gray-900 dark:to-gray-800 text-white py-4 text-center">
      <div className="max-w-7xl mx-auto space-y-2">
        <p>
          &copy; {new Date().getFullYear()} AWB<br /> All rights reserved
        </p>
        <p className="flex items-center justify-center gap-1">
          Coded with{' '}
          <span className="inline-block animate-heartbeat">❤️</span> by{' '}
          <a
            href="https://fresh-teacher.github.io"
            className="text-[#F4C2C2] font-bold hover:underline transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fresh Teacher
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;