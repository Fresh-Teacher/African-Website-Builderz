import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, School, Calendar, MessageSquare } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

const StudentTable = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">WhatsApp</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedStudent(student);
                  setIsModalOpen(true);
                }}
              >
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">{student["Full Name"]}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <Phone className="h-4 w-4 mr-2 text-gray-600" />
                    {student["Telephone contact"]}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    {student["WhatsApp number"]}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <Mail className="h-4 w-4 mr-2 text-gray-600" />
                    {student["Email Address"]}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="lg:hidden space-y-4">
        {students.map((student, index) => (
          <div 
            key={index}
            className="bg-white p-4 rounded-lg shadow cursor-pointer"
            onClick={() => {
              setSelectedStudent(student);
              setIsModalOpen(true);
            }}
          >
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-900">{student["Full Name"]}</div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="h-4 w-4 text-gray-600" />
                  {student["Telephone contact"]}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="h-4 w-4 text-gray-600" />
                  {student["WhatsApp number"]}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  {student["Email Address"]}
                </div>
              </div>
            </div>
          </div>
        ))}
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
                  <h2 className="text-xl font-bold text-gray-900">{selectedStudent["Full Name"]}</h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">{selectedStudent["Telephone contact"]}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">{selectedStudent["WhatsApp number"]}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-600 mr-2" />
                        <span className="text-sm text-gray-600">{selectedStudent["Email Address"]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
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
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">Amount Paid: {selectedStudent.amountPaid?.toLocaleString() || 0} UGX</p>
                    </div>
                  </div>

                  {/* School Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">School Information</h3>
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
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
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