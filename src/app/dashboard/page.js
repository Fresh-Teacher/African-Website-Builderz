"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { registrationData } from '@/utils/mockData';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton'; // Add this line
import { 
  PersonCircle, 
  Building, 
  Laptop, 
  BarChartFill,
  EnvelopeFill,
  TelephoneFill,
  GeoAltFill,
  Calendar2Check,
  CheckCircleFill,
  HourglassSplit,
  BoxArrowRight
} from 'react-bootstrap-icons';

const MotionDiv = motion.div;

// Helper functions remain the same...
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 22) return "Good evening";
  return "Good night";
};

const getLastName = (fullName) => {
  const nameParts = fullName.split(' ');
  return nameParts[nameParts.length - 1];
};

// Enhanced animated progress bar component with color coding
const AnimatedProgress = ({ percentage }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getProgressColor = (percentage) => {
    if (percentage < 40) return { bg: 'bg-red-100', fill: 'bg-red-600' };
    if (percentage < 70) return { bg: 'bg-orange-100', fill: 'bg-orange-600' };
    if (percentage < 100) return { bg: 'bg-blue-100', fill: 'bg-blue-600' };
    return { bg: 'bg-green-100', fill: 'bg-green-600' };
  };

  const colors = getProgressColor(percentage);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${
          percentage < 40 ? 'text-red-600 dark:text-red-400' :
          percentage < 70 ? 'text-orange-600 dark:text-orange-400' :
          percentage < 100 ? 'text-blue-600 dark:text-blue-400' :
          'text-green-600 dark:text-green-400'
        }`}>
          {percentage < 40 ? 'Low' :
           percentage < 70 ? 'Moderate' :
           percentage < 100 ? 'Progressing' :
           'Completed!'}
        </span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{percentage}%</span>
      </div>
      <div ref={ref} className={`w-full ${colors.bg} dark:bg-opacity-20 rounded-full h-2.5`}>
        <MotionDiv
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${colors.fill} dark:bg-opacity-90 h-full rounded-full transition-colors duration-300`}
        />
      </div>
    </div>
  );
};

// AnimatedCard component update
const AnimatedCard = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
    >
      {children}
    </MotionDiv>
  );
};

// Financial progress bar component update
const FinancialProgress = ({ percentage }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Payments Made</span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{percentage}% paid</span>
      </div>
      <div ref={ref} className="relative h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <MotionDiv
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full ${
            percentage === 0 ? 'bg-red-500' :
            percentage < 50 ? 'bg-orange-500' :
            percentage < 100 ? 'bg-blue-500' :
            'bg-emerald-500'
          } dark:bg-opacity-90 rounded-full`}
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const userIndex = sessionStorage.getItem('userIndex');
    if (!userIndex) {
      router.push('/');
      return;
    }
    
    const user = registrationData["Form Responses 1"][parseInt(userIndex)];
    if (!user) {
      router.push('/');
      return;
    }
    
    setUserData(user);
    setPaymentProgress(Math.round((user.amountPaid / 36696) * 100));
    setGreeting(getTimeBasedGreeting());
    setIsLoading(false);

    const intervalId = setInterval(() => {
      setGreeting(getTimeBasedGreeting());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('userIndex');
    router.push('/');
  };

  if (isLoading || !userData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalCourses = Object.keys(userData.courseProgress).length;
  const CompletedCourses = Object.values(userData.courseProgress).filter(status => status === "Completed").length;
  const progressPercentage = Math.round((CompletedCourses / totalCourses) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto p-6">
          {/* Welcome Header */}
          <MotionDiv 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center justify-between"
          >
            <div className="flex items-center">
              <PersonCircle className="text-blue-600 dark:text-blue-400 h-8 w-8 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {greeting}, Tr. {getLastName(userData["Full Name"])}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Track your progress in the African Website Builders course</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200 group"
            >
              <BoxArrowRight className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
              <span className="group-hover:text-red-500 transition-colors">Logout</span>
            </button>
          </MotionDiv>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Course Progress Card */}
            <AnimatedCard delay={0}>
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <BarChartFill className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Course Progress</p>
                  </div>
                </div>
                <AnimatedProgress percentage={progressPercentage} />
              </div>
            </AnimatedCard>

            {/* School Card */}
            <AnimatedCard delay={0.2}>
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <Building className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">School</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{userData["School Name"]}</p>
                </div>
              </div>
            </AnimatedCard>

            {/* Role Card */}
            <AnimatedCard delay={0.4}>
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                  <PersonCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Role</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{userData["Role at School"]}</p>
                </div>
              </div>
            </AnimatedCard>

            {/* Financial Card */}
            <AnimatedCard delay={0.6}>
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-full">
                    <svg 
                      className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Tuition</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {userData.amountPaid.toLocaleString()} / 36,696 UGX
                    </p>
                  </div>
                </div>
                <FinancialProgress percentage={paymentProgress} />
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-right font-medium">
                  Balance: {(36696 - userData.amountPaid).toLocaleString()} UGX
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Course Progress Details */}
          <AnimatedCard>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar2Check className="mr-2 text-blue-600 dark:text-blue-400" />
              Course Modules Progress
            </h2>
            <div className="space-y-4">
              {Object.entries(userData.courseProgress).map(([module, status], index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <p className="text-gray-800 dark:text-white flex-1 flex items-center">
                    {status === "Completed" ? (
                      <CheckCircleFill className="text-green-600 dark:text-green-400 mr-2" />
                    ) : (
                      <HourglassSplit className="text-yellow-600 dark:text-yellow-400 mr-2" />
                    )}
                    {module}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    status === "Completed" 
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300" 
                    : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300"
                  }`}>
                    {status}
                  </span>
                </MotionDiv>
              ))}
            </div>
          </AnimatedCard>

           {/* Contact Information */}
          <AnimatedCard>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <EnvelopeFill className="mr-2 text-blue-600 dark:text-blue-400" />, label: "Email", value: userData["Email Address"] },
                { icon: <TelephoneFill className="mr-2 text-blue-600 dark:text-blue-400" />, label: "WhatsApp", value: userData["WhatsApp number"] },
                { icon: <GeoAltFill className="mr-2 text-blue-600 dark:text-blue-400" />, label: "District", value: userData["District of Residence"] },
                { icon: <Building className="mr-2 text-blue-600 dark:text-blue-400" />, label: "Physical Classes", value: userData["Can you attend physical classes if the training centre is around Kampala?"] }
              ].map((item, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    {item.icon}
                    {item.label}
                  </p>
                  <p className="text-gray-800 dark:text-white">{item.value}</p>
                </MotionDiv>
              ))}
            </div>
          </AnimatedCard>
        </div>
        </main>
    <Footer />
    <ScrollToTopButton /> {/* Add this line */}
  </div>
);
}