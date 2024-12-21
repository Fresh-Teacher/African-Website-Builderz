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
import { 
  PersonCircle, 
  Building,
  PeopleFill,
  CashStack,
  Search,
  PencilSquare,
  TrashFill,
  BoxArrowRight,
  GraphUpArrow,
  FileEarmarkText,
  GearFill
} from 'react-bootstrap-icons';

const MotionDiv = motion.div;

// Stats Card Component
const StatsCard = ({ icon, label, value, bgColor, textColor }) => (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      <div className="flex items-center">
        <div className={`${bgColor} p-3 rounded-full flex-shrink-0`}>
          {icon}
        </div>
        <div className="ml-4 min-w-0"> {/* Add min-w-0 to allow text truncation */}
          <p className="text-sm font-medium text-gray-600 truncate">{label}</p>
          <p className={`text-lg font-bold ${textColor} truncate`}>{value}</p>
        </div>
      </div>
    </MotionDiv>
  );

// Student Row Component
const StudentRow = ({ student, onEdit }) => {
    const progressPercentage = Math.round(
      (Object.values(student.courseProgress).filter(status => status === "Completed").length /
      Object.keys(student.courseProgress).length) * 100
    );
  
    // Calculate amount paid (assuming 36,696 is total amount)
    const totalAmount = 36696;
    const amountPaid = student.paymentStatus ? 
      (student.paymentStatus.paid || 0) : 0; // Safely access payment data
    const paymentPercentage = Math.round((amountPaid / totalAmount) * 100);
  
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PersonCircle className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{student["Full Name"]}</div>
              <div className="text-sm text-gray-500">{student["Email Address"]}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{student["School Name"]}</div>
          <div className="text-sm text-gray-500">{student["Role at School"]}</div>
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
          <div className="text-sm text-gray-500">
            {paymentPercentage}% paid
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => onEdit(student)}
            className="text-blue-600 hover:text-blue-900 mr-4"
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
    // Check for admin role
    const userRole = sessionStorage.getItem('userRole');
    if (userRole !== 'admin') {
      router.push('/');
      return;
    }

    // Load student data
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

// Calculate total revenue with safe access to payment data
const totalRevenue = students.reduce((sum, student) => {
    const amountPaid = student.paymentStatus ? 
      (student.paymentStatus.paid || 0) : 0;
    return sum + amountPaid;
  }, 0);
  
  // Calculate average progress while handling potential missing data
  const averageProgress = students.length > 0 ? Math.round(
    students.reduce((sum, student) => {
      // Check if courseProgress exists
      if (!student.courseProgress) return sum;
      
      const completedCourses = Object.values(student.courseProgress || {})
        .filter(status => status === "Completed").length;
      const totalCourses = Object.keys(student.courseProgress || {}).length;
      
      // Only calculate progress if there are courses
      const progress = totalCourses > 0 ? 
        (completedCourses / totalCourses) * 100 : 0;
      
      return sum + progress;
    }, 0) / students.length
  ) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
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
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <MotionDiv 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center justify-between"
          >
            <div className="flex items-center">
              <GearFill className="text-blue-600 h-8 w-8 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage students and track overall progress</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200 shadow-sm transition-colors duration-200 group"
            >
              <BoxArrowRight className="h-5 w-5 mr-2 text-gray-500 group-hover:text-red-500 transition-colors" />
              <span className="group-hover:text-red-500 transition-colors">Logout</span>
            </button>
          </MotionDiv>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              icon={<PeopleFill className="h-6 w-6 text-blue-600" />}
              label="Total Students"
              value={students.length}
              bgColor="bg-blue-100"
              textColor="text-blue-900"
            />
            <StatsCard
              icon={<GraphUpArrow className="h-6 w-6 text-green-600" />}
              label="Average Progress"
              value={`${averageProgress}%`}
              bgColor="bg-green-100"
              textColor="text-green-900"
            />
            <StatsCard
              icon={<CashStack className="h-6 w-6 text-purple-600" />}
              label="Total Revenue"
              value={`${totalRevenue.toLocaleString()} UGX`}
              bgColor="bg-purple-100"
              textColor="text-purple-900"
            />
            <StatsCard
              icon={<FileEarmarkText className="h-6 w-6 text-orange-600" />}
              label="Completion Rate"
              value={`${Math.round((students.filter(s => 
                Object.values(s.courseProgress).every(status => status === "Completed")
              ).length / students.length) * 100)}%`}
              bgColor="bg-orange-100"
              textColor="text-orange-900"
            />
          </div>

{/* Student List */}
<div className="bg-white rounded-lg shadow-sm">
  <div className="p-4 sm:p-6 border-b border-gray-200">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <h2 className="text-xl font-bold text-gray-900">Student Management</h2>
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search students..."
          className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  </div>
  <div className="overflow-x-auto"> {/* This ensures horizontal scrolling */}
    <div className="min-w-full inline-block align-middle">
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      School
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student, index) => (
                    <StudentRow 
                      key={index}
                      student={student}
                      onEdit={setSelectedStudent}
                    />
                  ))}
                </tbody>
                </table>
    </div>
  </div>
</div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}