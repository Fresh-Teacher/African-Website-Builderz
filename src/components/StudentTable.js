import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, MapPin, School, Calendar, MessageSquare, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

const SectionTitle = ({ children }) => (
  <h3 className="text-lg font-bold text-gray-900 mb-4">{children}</h3>
);

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    return isVisible ? (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
        <span className="absolute -top-8 right-0 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Scroll to top
        </span>
      </button>
    ) : null;
  };
  
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [jumpToPage, setJumpToPage] = useState(currentPage + 1);
  
    useEffect(() => {
      const nextPage = currentPage + 1;
      if (nextPage <= totalPages) {
        setJumpToPage(nextPage);
      } else {
        setJumpToPage(1);
      }
    }, [currentPage, totalPages]);
  
    const handlePageSubmit = (e) => {
      e.preventDefault();
      const pageNumber = parseInt(jumpToPage);
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        onPageChange(pageNumber);
      }
    };
  
    const handlePageChange = (newPage) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      onPageChange(newPage);
    };
  
    return (
      <div className="bg-white border rounded-lg shadow-sm mt-4 mb-8">
        <div className="p-3 sm:p-4">
          {/* Mobile Layout */}
          <div className="flex flex-col space-y-3">
            {/* Navigation Buttons - Mobile */}
            <div className="flex justify-between sm:hidden w-full">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-600 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Previous</span>
              </button>
  
              <span className="text-base text-gray-800 font-semibold self-center">
                Page {currentPage} of {totalPages}
              </span>
  
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-600 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
  
            {/* Jump to Page - Mobile */}
            <div className="sm:hidden">
              <form onSubmit={handlePageSubmit} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label htmlFor="jump-to-page-mobile" className="text-sm text-gray-900 font-semibold whitespace-nowrap">
                    Go to page:
                  </label>
                  <input
                    id="jump-to-page-mobile"
                    type="number"
                    min="1"
                    max={totalPages}
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    className="w-16 px-2 py-1 text-sm text-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <span>Jump</span>
                  <ArrowUp className="h-3 w-3" />
                </button>
              </form>
            </div>
  
            {/* Desktop Layout */}
            <div className="hidden sm:flex sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center px-4 py-2 text-sm text-gray-900 bg-white border border-gray-600 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span>Previous Page</span>
                </button>
  
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center px-4 py-2 text-sm text-gray-900 bg-white border border-gray-600 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next Page</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
  
              <div className="flex items-center space-x-4">
                <div className="text-base text-gray-800 font-semibold">
                  Page {currentPage} of {totalPages}
                </div>
                <form onSubmit={handlePageSubmit} className="flex items-center space-x-2">
                  <label htmlFor="jump-to-page-desktop" className="text-sm text-gray-900 font-semibold whitespace-nowrap">
                    Go to page:
                  </label>
                  <input
                    id="jump-to-page-desktop"
                    type="number"
                    min="1"
                    max={totalPages}
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    className="w-16 px-2 py-1 text-sm text-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <span>Jump</span>
                    <ArrowUp className="h-3 w-3" />
                  </button>
                </form>
              </div>
            </div>
          </div>
  
          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-1.5 mt-3">
            <div
              className="bg-blue-700 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

    const StudentTable = ({ students }) => {
        const [selectedStudent, setSelectedStudent] = useState(null);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const studentsPerPage = 10;
      
        const totalPages = Math.ceil(students.length / studentsPerPage);
        const startIndex = (currentPage - 1) * studentsPerPage;
        const endIndex = startIndex + studentsPerPage;
        const currentStudents = students.slice(startIndex, endIndex);
      
         // Function to capitalize name
  const formatName = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

  const handleContact = (e, type, value) => {
    e.stopPropagation();
    if (!value) return;

    switch (type) {
      case 'whatsapp':
        const whatsappNumber = value.replace(/\D/g, '');
        window.open(`https://wa.me/${whatsappNumber}`, '_blank');
        break;
      case 'phone':
        window.open(`tel:${value}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${value}`, '_blank');
        break;
      default:
        break;
    }
  };

  const ContactItem = ({ type, value, icon: Icon }) => (
    <div 
      onClick={(e) => handleContact(e, type, value)}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
      title={`Click to ${type === 'whatsapp' ? 'message on WhatsApp' : type === 'phone' ? 'call' : 'send email'}`}
    >
      <Icon className="h-4 w-4" />
      <span>{value}</span>
    </div>
  );

  const formatDateTime = (timestamp) => {
    if (!timestamp) return '';
    const [datePart, timePart] = timestamp.split(' ');
    const [month, day, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    
    const dateFormatted = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
    
    const timeFormatted = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
    
    return `${dateFormatted}, ${timeFormatted}`;
  };

  // Calculate course progress percentage
  const getProgressPercentage = (courseProgress) => {
    const totalCourses = Object.keys(courseProgress || {}).length;
    const completedCourses = Object.values(courseProgress || {}).filter(
      status => status === "Completed"
    ).length;
    return totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
  };

  return (
    <div className="w-full relative">
      <ScrollToTop />
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase">WhatsApp</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-800 uppercase">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStudents.map((student, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedStudent(student);
                  setIsModalOpen(true);
                }}
              >
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {formatName(student["Full Name"])}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <ContactItem 
                    type="phone"
                    value={student["Telephone contact"]}
                    icon={Phone}
                  />
                </td>
                <td className="px-4 py-4">
                  <ContactItem 
                    type="whatsapp"
                    value={student["WhatsApp number"]}
                    icon={MessageCircle}
                  />
                </td>
                <td className="px-4 py-4">
                  <ContactItem 
                    type="email"
                    value={student["Email Address"]}
                    icon={Mail}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Mobile List */}
      <div className="lg:hidden space-y-4">
        {currentStudents.map((student, index) => (
          <div 
            key={index}
            className="bg-white p-4 rounded-lg shadow"
            onClick={() => {
              setSelectedStudent(student);
              setIsModalOpen(true);
            }}
          >
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">
                {formatName(student["Full Name"])}
              </div>
              <div className="space-y-2">
                <ContactItem 
                  type="phone"
                  value={student["Telephone contact"]}
                  icon={Phone}
                />
                <ContactItem 
                  type="whatsapp"
                  value={student["WhatsApp number"]}
                  icon={MessageCircle}
                />
                <ContactItem 
                  type="email"
                  value={student["Email Address"]}
                  icon={Mail}
                />
              </div>
            </div>
          </div>
        ))}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal with Details */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedStudent["Full Name"]}</h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Contact Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <SectionTitle>Contact Information</SectionTitle>
                    <div className="space-y-3">
                      <ContactItem 
                        type="phone"
                        value={selectedStudent["Telephone contact"]}
                        icon={Phone}
                      />
                      <ContactItem 
                        type="whatsapp"
                        value={selectedStudent["WhatsApp number"]}
                        icon={MessageCircle}
                      />
                      <ContactItem 
                        type="email"
                        value={selectedStudent["Email Address"]}
                        icon={Mail}
                      />
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <SectionTitle>Course Progress</SectionTitle>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Overall Progress</span>
                        <span className="text-gray-600">{getProgressPercentage(selectedStudent.courseProgress)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${getProgressPercentage(selectedStudent.courseProgress)}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(selectedStudent.courseProgress).map(([course, status], index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{course}</span>
                          <span className={`text-sm px-2 py-1 rounded ${
                            status === "Completed" ? "bg-green-100 text-green-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <SectionTitle>Payment Information</SectionTitle>
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">Amount Paid: {selectedStudent.amountPaid?.toLocaleString() || 0} UGX</p>
                    </div>
                  </div>

                  {/* School Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <SectionTitle>School Information</SectionTitle>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center">
                        <School className="h-5 w-5 text-gray-600 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{selectedStudent["School Name"]}</p>
                          <p className="text-sm text-gray-600">{selectedStudent["Level of Institution"]}</p>
                          <p className="text-sm text-gray-600">{selectedStudent["Role at School"]}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">{selectedStudent["District of Residence"]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <SectionTitle>Additional Information</SectionTitle>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">
                          Registered: {formatDateTime(selectedStudent["Timestamp"])}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong className="text-gray-900">Study Device:</strong> {selectedStudent["Which device will you use for study during the course?"]}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong className="text-gray-900">Physical Classes:</strong> {selectedStudent["Can you attend physical classes if the training centre is around Kampala?"]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;