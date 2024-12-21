import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}