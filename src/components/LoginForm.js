'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { registrationData } from '@/utils/mockData';

const ADMIN_CREDENTIALS = {
  email: 'admin@awb.com',
  password: '@WB'
};

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate network delay for authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check for admin login
      if (email.toLowerCase() === ADMIN_CREDENTIALS.email && 
          password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('userRole', 'admin');
        router.push('/admin');
        return;
      }

      // Regular user authentication
      const userIndex = registrationData["Form Responses 1"].findIndex(
        entry => entry["Email Address"].toLowerCase() === email.toLowerCase()
      );

      if (userIndex === -1) {
        setError('Invalid email address');
        setIsLoading(false);
        return;
      }

      const user = registrationData["Form Responses 1"][userIndex];
      const cleanPassword = password.replace(/\D/g, '');
      const cleanStoredPhone = user["Telephone contact"].replace(/\D/g, '');
      const normalizedPassword = cleanPassword.replace(/^0+/, '');
      const normalizedStoredPhone = cleanStoredPhone.replace(/^0+/, '');

      if (normalizedPassword !== normalizedStoredPhone) {
        setError('Invalid password');
        setIsLoading(false);
        return;
      }

      // Store the user info
      sessionStorage.setItem('userIndex', userIndex.toString());
      sessionStorage.setItem('userRole', 'user');
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md transition-colors relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Signing you in...</p>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-2">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">Please login to access your account</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none disabled:opacity-50"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
              disabled={isLoading}
            />
            <label htmlFor="remember" className="text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <a href="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-800 dark:to-blue-600 text-white rounded-md font-medium hover:from-blue-800 hover:to-blue-900 dark:hover:from-blue-700 dark:hover:to-blue-800 transform hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Signing in...
            </>
          ) : (
            'Log In'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;