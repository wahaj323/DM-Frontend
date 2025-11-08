import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  Target,
  TrendingUp,
  Filter,
  LayoutGrid,
  List,
  Sparkles
} from 'lucide-react';
import { courseAPI } from '../services/courseAPI';
import useAuthStore from '../store/authStore';
import CourseCard from '../components/CourseCard';

const StudentCourses = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [activeTab, setActiveTab] = useState('enrolled');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const allCourses = await courseAPI.getAllCourses({ published: true });
      setCourses(allCourses);

      const enrolled = allCourses.filter(course =>
        course.enrolledStudents?.some(e => e.studentId === user?._id)
      );
      setEnrolledCourses(enrolled);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (course) => {
    const isEnrolled = course.enrolledStudents?.some(e => e.studentId === user?._id);
    if (isEnrolled) {
      navigate(`/courses/${course._id}`);
    } else {
      navigate(`/courses/${course._id}`);
    }
  };

  const filteredCourses = (activeTab === 'enrolled' ? enrolledCourses : courses).filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filterLevel || course.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Header */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1.5 sm:p-2">
                      <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                      Learning Hub
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                    My German Courses
                  </h1>
                  <p className="text-xs sm:text-sm lg:text-base text-blue-100">
                    Continue learning and explore new courses
                  </p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center border border-white/30">
                    <div className="text-lg sm:text-2xl font-bold">{enrolledCourses.length}</div>
                    <div className="text-[9px] sm:text-xs text-blue-100">Enrolled</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 mb-4 sm:mb-6 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm transition relative ${
                activeTab === 'enrolled'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>My Courses</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
                  activeTab === 'enrolled'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {enrolledCourses.length}
                </span>
              </div>
              {activeTab === 'enrolled' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('available')}
              className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm transition relative ${
                activeTab === 'available'
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Explore</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
                  activeTab === 'available'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {courses.length}
                </span>
              </div>
              {activeTab === 'available' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 sm:pl-10 w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Level Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setFilterLevel('')}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                      filterLevel === ''
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => setFilterLevel(level)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                        filterLevel === level
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 rounded-lg transition ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 rounded-lg transition ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          {filteredCourses.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'}
                {searchTerm && <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>}
                {filterLevel && <span> at <span className="font-semibold">{filterLevel}</span> level</span>}
              </p>
            </div>
          )}
        </div>

        {/* Courses Grid/List */}
        {loading ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'
            : 'space-y-3 sm:space-y-4'
          }>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 animate-pulse overflow-hidden">
                <div className="h-32 sm:h-40 bg-gray-200"></div>
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 lg:p-16 text-center">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              {activeTab === 'enrolled'
                ? 'No enrolled courses yet'
                : searchTerm || filterLevel
                ? 'No courses found'
                : 'No courses available'}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
              {activeTab === 'enrolled'
                ? 'Contact your teacher to get enrolled in a course'
                : searchTerm || filterLevel
                ? 'Try adjusting your search or filter'
                : 'Check back later for new courses'}
            </p>
            {activeTab === 'enrolled' && (
              <button
                onClick={() => setActiveTab('available')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto active:scale-95"
              >
                <Sparkles className="w-5 h-5" />
                Explore Available Courses
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'
            : 'space-y-3 sm:space-y-4'
          }>
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onView={handleViewCourse}
                isTeacher={false}
                isEnrolled={course.enrolledStudents?.some(e => e.studentId === user?._id)}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Motivational Message */}
        {enrolledCourses.length > 0 && activeTab === 'enrolled' && !loading && (
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="relative z-10 flex items-center gap-3 sm:gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 flex-shrink-0">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-1">Keep Going! 🚀</h3>
                <p className="text-xs sm:text-sm text-emerald-100">
                  You're enrolled in {enrolledCourses.length} {enrolledCourses.length === 1 ? 'course' : 'courses'}. 
                  Keep learning and you'll master German in no time!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;