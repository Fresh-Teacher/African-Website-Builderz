import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, School, Calendar } from 'lucide-react';

const StudentTable = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration</th>
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
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student["Full Name"]}</div>
                      <div className="text-sm text-gray-500">{student["School Name"]}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">{student["Telephone contact"]}</div>
                  <div className="text-sm text-gray-500">{student["WhatsApp number"]}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{getProgressPercentage(student.courseProgress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${getProgressPercentage(student.courseProgress)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900">
                    {student.amountPaid?.toLocaleString() || 0} UGX
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-500">
                    {new Date(student["Registration date"]).toLocaleDateString()}
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
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{student["Full Name"]}</h3>
                <p className="text-sm text-gray-500">{student["School Name"]}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {new Date(student["Registration date"]).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">{student["Telephone contact"]}</p>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{getProgressPercentage(student.courseProgress)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${getProgressPercentage(student.courseProgress)}%` }}
                  />
                </div>
              </div>
              
              <div className="text-sm">
                <span className="text-gray-500">Payment: </span>
                <span className="font-medium">{student.amountPaid?.toLocaleString() || 0} UGX</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Student Details</h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{selectedStudent["Email Address"]}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          Tel: {selectedStudent["Telephone contact"]}
                          <br />
                          WhatsApp: {selectedStudent["WhatsApp number"]}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{selectedStudent["District of Residence"]}</span>
                      </div>
                      <div className="flex items-center">
                        <School className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          {selectedStudent["Level of Institution"]} - {selectedStudent["Role at School"]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course Progress */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
                    <div className="space-y-3">
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

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">
                          Registered: {new Date(selectedStudent["Registration date"]).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Study Device:</strong> {selectedStudent["Which device will you use for study during the course?"]}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Physical Classes:</strong> {selectedStudent["Can you attend physical classes if the training centre is around Kampala?"]}
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