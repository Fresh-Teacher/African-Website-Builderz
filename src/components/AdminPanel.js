'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { registrationData } from '@/utils/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  BarChart,
  Users,
  BookOpen,
  DollarSign,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';

const AdminPanel = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    completionRate: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole !== 'admin') {
      router.push('/');
      return;
    }

    // Calculate statistics
    const students = registrationData["Form Responses 1"];
    const totalStudents = students.length;
    const activeStudents = students.filter(student => 
      Object.values(student.courseProgress).some(status => status === "In Progress")
    ).length;
    const completedStudents = students.filter(student =>
      Object.values(student.courseProgress).every(status => status === "Completed")
    ).length;
    const totalRevenue = students.reduce((sum, student) => sum + (student.amountPaid || 0), 0);

    setStats({
      totalStudents,
      activeStudents,
      completionRate: Math.round((completedStudents / totalStudents) * 100),
      totalRevenue
    });

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('userRole');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-800">
            <BarChart className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800">
            <Users className="h-5 w-5" />
            <span>Students</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800">
            <BookOpen className="h-5 w-5" />
            <span>Courses</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800">
            <DollarSign className="h-5 w-5" />
            <span>Payments</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800">
            <Calendar className="h-5 w-5" />
            <span>Schedule</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800 mt-auto absolute bottom-6"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500">Total Students</h3>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold">{stats.totalStudents}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500">Active Students</h3>
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold">{stats.activeStudents}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500">Completion Rate</h3>
                <BarChart className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-3xl font-bold">{stats.completionRate}%</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500">Total Revenue</h3>
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold">{stats.totalRevenue.toLocaleString()} UGX</p>
            </div>
          </div>

          {/* Recent Students Table */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Recent Students</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="pb-4">Name</th>
                    <th className="pb-4">School</th>
                    <th className="pb-4">Progress</th>
                    <th className="pb-4">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registrationData["Form Responses 1"].slice(0, 5).map((student, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4">{student["Full Name"]}</td>
                      <td className="py-4">{student["School Name"]}</td>
                      <td className="py-4">
                        {Object.values(student.courseProgress).filter(status => 
                          status === "Completed"
                        ).length} / {Object.keys(student.courseProgress).length} modules
                      </td>
                      <td className="py-4">
                        {student.amountPaid ? 
                          <span className="text-green-600">Paid: {student.amountPaid.toLocaleString()} UGX</span> :
                          <span className="text-red-600">Pending</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;