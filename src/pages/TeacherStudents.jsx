import { useState, useEffect } from 'react';
import { Search, Filter, UserPlus, ChevronLeft, ChevronRight, Eye, UserCheck, UserX, BookOpen } from 'lucide-react';
import { studentAPI } from '../services/studentAPI';
import { courseAPI } from '../services/courseAPI';
import StudentCard from '../components/StudentCard';
import ActivityFeed from '../components/ActivityFeed';

const TeacherStudents = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, [pagination.page, sortBy, order, searchTerm]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentAPI.getAllStudents({
        search: searchTerm,
        page: pagination.page,
        limit: pagination.limit,
        sortBy,
        order
      });
      setStudents(data.students);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await courseAPI.getMyCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleViewDetails = async (student) => {
    setSelectedStudent(student);
    setShowModal(true);
    try {
      const data = await studentAPI.getStudent(student._id);
      setStudentDetails(data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleToggleActive = async (studentId, currentStatus) => {
    if (confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this student?`)) {
      try {
        await studentAPI.toggleActiveStatus(studentId);
        fetchStudents();
        alert(`Student ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      } catch (error) {
        alert('Failed to update student status');
      }
    }
  };

  const handleEnrollStudent = (student) => {
    setSelectedStudent(student);
    setShowEnrollModal(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 });
    fetchStudents();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600 mt-2">Manage and monitor your students' progress</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Sort By */}
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="createdAt">Date Joined</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
              </select>

              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{pagination.total}</p>
              </div>
              <UserCheck className="h-10 w-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Students</p>
                <p className="text-3xl font-bold text-gray-900">
                  {students.filter(s => s.isActive).length}
                </p>
              </div>
              <UserCheck className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Inactive Students</p>
                <p className="text-3xl font-bold text-gray-900">
                  {students.filter(s => !s.isActive).length}
                </p>
              </div>
              <UserX className="h-10 w-10 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Enrollments</p>
                <p className="text-3xl font-bold text-gray-900">
                  {students.reduce((acc, s) => acc + (s.enrolledCourses?.length || 0), 0)}
                </p>
              </div>
              <Filter className="h-10 w-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Students Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <UserPlus className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search' : 'Students will appear here once they sign up'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  onViewDetails={handleViewDetails}
                  onToggleActive={handleToggleActive}
                  onEnroll={handleEnrollStudent}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>{' '}
                  of <span className="font-medium">{pagination.total}</span> students
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                    disabled={pagination.page === 1}
                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    disabled={pagination.page === pagination.pages}
                    className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Student Details Modal */}
        {showModal && selectedStudent && (
          <StudentDetailsModal
            student={selectedStudent}
            studentDetails={studentDetails}
            onClose={() => {
              setShowModal(false);
              setStudentDetails(null);
            }}
            onToggleActive={handleToggleActive}
            onEnroll={handleEnrollStudent}
          />
        )}

        {/* Enroll Modal */}
        {showEnrollModal && selectedStudent && (
          <EnrollStudentModal
            student={selectedStudent}
            courses={courses}
            onClose={() => {
              setShowEnrollModal(false);
              setSelectedStudent(null);
            }}
            onSuccess={() => {
              setShowEnrollModal(false);
              setSelectedStudent(null);
              fetchStudents();
              alert('Student enrolled successfully!');
            }}
          />
        )}
      </div>
    </div>
  );
};

// Student Details Modal Component
const StudentDetailsModal = ({ student, studentDetails, onClose, onToggleActive, onEnroll }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {student.profileImage ? (
              <img
                src={student.profileImage}
                alt={student.name}
                className="w-16 h-16 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full border-4 border-white bg-white/20 flex items-center justify-center">
                <Eye className="w-8 h-8" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-primary-100">{student.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!studentDetails ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading student details...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress Stats */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-700">
                      {studentDetails.student.enrolledCourses?.length || 0}
                    </p>
                    <p className="text-sm text-blue-600">Enrolled Courses</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-700">
                      {studentDetails.student.unlockedLessons?.length || 0}
                    </p>
                    <p className="text-sm text-green-600">Unlocked Lessons</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-700">
                      {studentDetails.student.personalDictionary?.length || 0}
                    </p>
                    <p className="text-sm text-purple-600">Vocabulary Words</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-orange-700">
                      {studentDetails.student.unlockedQuizzes?.length || 0}
                    </p>
                    <p className="text-sm text-orange-600">Quizzes Unlocked</p>
                  </div>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Enrolled Courses</h3>
                {studentDetails.student.enrolledCourses?.length > 0 ? (
                  <div className="space-y-2">
                    {studentDetails.student.enrolledCourses.map((enrollment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            Course ID: {enrollment.courseId}
                          </p>
                          <p className="text-sm text-gray-600">
                            Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">No courses enrolled yet</p>
                )}
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <ActivityFeed activities={studentDetails.recentActivity} loading={false} />
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-4 border-t">
                <button
                  onClick={() => {
                    onClose();
                    onEnroll(student);
                  }}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Enroll in Course
                </button>
                <button
                  onClick={() => {
                    onToggleActive(student._id, student.isActive);
                    onClose();
                  }}
                  className={`flex-1 ${
                    student.isActive
                      ? 'bg-gray-600 hover:bg-gray-700'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white px-6 py-2 rounded-lg font-medium transition`}
                >
                  {student.isActive ? 'Deactivate' : 'Activate'} Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Enroll Student Modal Component
const EnrollStudentModal = ({ student, courses, onClose, onSuccess }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEnroll = async () => {
    if (!selectedCourse) {
      setError('Please select a course');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await courseAPI.enrollStudent(selectedCourse, student._id);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
          <h2 className="text-2xl font-bold">Enroll Student in Course</h2>
          <p className="text-primary-100 mt-1">{student.name}</p>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Choose a course...</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title} ({course.level})
                </option>
              ))}
            </select>
          </div>

          {courses.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                No courses available. Create a course first to enroll students.
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4 border-t">
            <button
              onClick={handleEnroll}
              disabled={loading || !selectedCourse || courses.length === 0}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enrolling...' : 'Enroll Student'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudents;