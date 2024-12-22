"use client";
import StudentTable from '@/components/StudentTable';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { registrationData } from '@/utils/mockData';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  PersonCircle, 
  PeopleFill,
  CashStack,
  Search,
  PencilSquare,
  BoxArrowRight,
  GraphUpArrow,
  FileEarmarkText,
  GearFill,
  ChevronDown
} from 'react-bootstrap-icons';

const MotionDiv = motion.div;

// Stats Card Component - Now more mobile-friendly
const StatsCard = ({ icon, label, value, bgColor, textColor }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
    >
    <div className="flex items-center">
      <div className={`${bgColor} p-3 rounded-full`}>
        {icon}
      </div>
      <div className="ml-4 flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{label}</p>

<p className={`text-base lg:text-lg font-bold ${textColor} truncate`}>{value}</p>
      </div>
    </div>
  </MotionDiv>
);

// Expandable Mobile Student Row Component
const MobileStudentRow = ({ student, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const progressPercentage = Math.round(
    (Object.values(student.courseProgress).filter(status => status === "Completed").length /
    Object.keys(student.courseProgress).length) * 100
  );

  const totalAmount = 36696;
  const amountPaid = student.paymentStatus ? 
    (student.paymentStatus.paid || 0) : 0;
  const paymentPercentage = Math.round((amountPaid / totalAmount) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center flex-1 min-w-0">
          <PersonCircle className="h-8 w-8 text-gray-400 flex-shrink-0" />
          <div className="ml-3 flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{student["Full Name"]}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{student["Email Address"]}</div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">School</div>
            <div className="text-sm text-gray-900">{student["School Name"]}</div>
            <div className="text-xs text-gray-500">{student["Role at School"]}</div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className={`h-full rounded-full ${
                  progressPercentage < 40 ? 'bg-red-500' :
                  progressPercentage < 70 ? 'bg-orange-500' :
                  progressPercentage < 100 ? 'bg-blue-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Payment</div>
            <div className="text-sm text-gray-900">{amountPaid.toLocaleString()} UGX</div>
            <div className="text-xs text-gray-500">{paymentPercentage}% paid</div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(student);
            }}
            className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"
          >
            <PencilSquare className="h-4 w-4 mr-2" />
            Edit Student
          </button>
        </div>
      )}
    </div>
  );
};

// Desktop Student Row Component
const DesktopStudentRow = ({ student, onEdit }) => {
  const progressPercentage = Math.round(
    (Object.values(student.courseProgress).filter(status => status === "Completed").length /
    Object.keys(student.courseProgress).length) * 100
  );

  const totalAmount = 36696;
  const amountPaid = student.paymentStatus ? 
    (student.paymentStatus.paid || 0) : 0;
  const paymentPercentage = Math.round((amountPaid / totalAmount) * 100);

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <PersonCircle className="h-8 w-8 text-gray-400" />
          <div className="ml-4 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{student["Full Name"]}</div>
            <div className="text-sm text-gray-500 truncate">{student["Email Address"]}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 truncate">{student["School Name"]}</div>
        <div className="text-sm text-gray-500 truncate">{student["Role at School"]}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-48">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className={`h-full rounded-full ${
                progressPercentage < 40 ? 'bg-red-500' :
                progressPercentage < 70 ? 'bg-orange-500' :
                progressPercentage < 100 ? 'bg-blue-500' :
                'bg-green-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{amountPaid.toLocaleString()} UGX</div>
        <div className="text-sm text-gray-500">{paymentPercentage}% paid</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEdit(student)}
          className="text-blue-600 hover:text-blue-900"
        >
          <PencilSquare className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

export default function AdminPanel() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole !== 'admin') {
      router.push('/');
      return;
    }

    setStudents(registrationData["Form Responses 1"]);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('userRole');
    router.push('/');
  };

  const filteredStudents = students.filter(student => 
    student["Full Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
    student["Email Address"].toLowerCase().includes(searchTerm.toLowerCase()) ||
    student["School Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = students.reduce((sum, student) => {
    const amountPaid = student.paymentStatus ? 
      (student.paymentStatus.paid || 0) : 0;
    return sum + amountPaid;
  }, 0);

  const averageProgress = students.length > 0 ? Math.round(
    students.reduce((sum, student) => {
      if (!student.courseProgress) return sum;
      
      const completedCourses = Object.values(student.courseProgress || {})
        .filter(status => status === "Completed").length;
      const totalCourses = Object.keys(student.courseProgress || {}).length;
      
      const progress = totalCourses > 0 ? 
        (completedCourses / totalCourses) * 100 : 0;
      
      return sum + progress;
    }, 0) / students.length
  ) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600">Loading admin panel...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Header */}
          <MotionDiv 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <GearFill className="text-blue-600 h-6 w-6 sm:h-8 sm:w-8 mr-3" />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">C Panel</h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage students and track progress</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200 group"
              >
                <BoxArrowRight className="h-5 w-5 mr-2 text-gray-500 group-hover:text-red-500 transition-colors" />
                <span className="group-hover:text-red-500 transition-colors">Logout</span>
              </button>
            </div>
          </MotionDiv>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <StatsCard
              icon={<PeopleFill className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />}
              label="Total Students"
              value={students.length}
              bgColor="bg-blue-100"
              textColor="text-blue-900"
            />
            <StatsCard
              icon={<GraphUpArrow className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />}
              label="Average Progress"
              value={`${averageProgress}%`}
              bgColor="bg-green-100"
              textColor="text-green-900"
            />
            <StatsCard
              icon={<CashStack className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />}
              label="Total Revenue"
              value={`${totalRevenue.toLocaleString()} UGX`}
              bgColor="bg-purple-100"
              textColor="text-purple-900"
            />
            <StatsCard
              icon={<FileEarmarkText className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />}
              label="Completion Rate"
              value={`${Math.round((students.filter(s => 
                Object.values(s.courseProgress).every(status => status === "Completed")
              ).length / students.length) * 100)}%`}
              bgColor="bg-orange-100"
              textColor="text-orange-900"
            />
          </div>

          {/* Student List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Student Management</h2>
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"

                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <StudentTable students={filteredStudents} />

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No students found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search terms or clear the search to see all students.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}