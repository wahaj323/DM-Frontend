import { 
  BookOpen, 
  Users, 
  Clock, 
  Lock, 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical,
  Star,
  TrendingUp,
  Award,
  Play,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, onView, onEdit, onDelete, onTogglePublish, isTeacher, isEnrolled, viewMode = 'grid' }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const getLevelConfig = (level) => {
    const configs = {
      'A1': { 
        gradient: 'from-emerald-500 to-teal-500',
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        border: 'border-emerald-300'
      },
      'A2': { 
        gradient: 'from-blue-500 to-cyan-500',
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-300'
      },
      'B1': { 
        gradient: 'from-amber-500 to-yellow-500',
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        border: 'border-amber-300'
      },
      'B2': { 
        gradient: 'from-orange-500 to-red-500',
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        border: 'border-orange-300'
      },
      'C1': { 
        gradient: 'from-red-500 to-pink-500',
        bg: 'bg-red-100',
        text: 'text-red-700',
        border: 'border-red-300'
      },
      'C2': { 
        gradient: 'from-purple-500 to-pink-500',
        bg: 'bg-purple-100',
        text: 'text-purple-700',
        border: 'border-purple-300'
      },
    };
    return configs[level] || { 
      gradient: 'from-gray-500 to-gray-600',
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      border: 'border-gray-300'
    };
  };

  const levelConfig = getLevelConfig(course.level);

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Thumbnail */}
          <div className="relative h-32 sm:h-40 sm:w-48 lg:w-64 flex-shrink-0">
            {course.thumbnail ? (
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            ) : (
              <div className={`flex items-center justify-center h-full bg-gradient-to-br ${levelConfig.gradient}`}>
                <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-white opacity-70" />
              </div>
            )}
            
            {/* Level Badge - Absolute */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
              <span className={`inline-block ${levelConfig.bg} ${levelConfig.text} px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold border ${levelConfig.border} shadow-sm`}>
                {course.level}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-5 lg:p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                {/* Status & Category */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {isEnrolled && (
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold shadow-md">
                      <CheckCircle className="w-3 h-3" />
                      Enrolled
                    </span>
                  )}
                  {course.isPublished ? (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold">
                      <Eye className="w-3 h-3" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-gray-200 text-gray-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold">
                      <Lock className="w-3 h-3" />
                      Draft
                    </span>
                  )}
                  <span className="inline-block bg-violet-100 text-violet-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold">
                    {course.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                    <span className="font-semibold text-gray-900">{course.modules?.length || 0}</span>
                    <span className="hidden sm:inline">modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                    <span className="font-semibold text-gray-900">{course.enrolledStudents?.length || 0}</span>
                    <span className="hidden sm:inline">students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                    <span className="font-semibold text-gray-900">{course.estimatedDuration || 0}h</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onView(course)}
                className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold transition shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2 group active:scale-95 text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">View</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-blue-200">
      {/* Thumbnail */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        ) : (
          <div className={`flex items-center justify-center h-full bg-gradient-to-br ${levelConfig.gradient} relative overflow-hidden`}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            <BookOpen className="h-16 w-16 sm:h-20 sm:w-20 text-white opacity-70 relative z-10 group-hover:scale-110 transition" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          {isEnrolled ? (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold shadow-lg backdrop-blur-sm">
              <CheckCircle className="w-3 h-3" />
              <span className="hidden sm:inline">Enrolled</span>
              <span className="sm:hidden">✓</span>
            </span>
          ) : course.isPublished ? (
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-blue-700 px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold shadow-md">
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Published</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold shadow-md">
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Draft</span>
            </span>
          )}
        </div>

        {/* Level Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <span className={`inline-block ${levelConfig.bg} ${levelConfig.text} px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-bold border ${levelConfig.border} shadow-md backdrop-blur-sm`}>
            {course.level}
          </span>
        </div>

        {/* Teacher Menu */}
        {isTeacher && (
          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="bg-white/95 hover:bg-white p-1.5 sm:p-2 rounded-lg transition shadow-md backdrop-blur-sm"
            >
              <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-30">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/teacher/courses/${course._id}/edit`);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-blue-50 text-gray-700 flex items-center gap-2 text-xs sm:text-sm font-medium transition"
                >
                  <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePublish(course._id, course.isPublished);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-amber-50 text-gray-700 flex items-center gap-2 border-t text-xs sm:text-sm font-medium transition"
                >
                  {course.isPublished ? <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />}
                  {course.isPublished ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(course._id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-red-50 text-red-600 flex items-center gap-2 border-t text-xs sm:text-sm font-medium transition"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Category Tag */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold border border-violet-200">
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3 sm:py-4 border-t border-gray-100 mb-3 sm:mb-4">
          <div className="text-center">
            <div className="bg-blue-50 rounded-lg p-2 mb-1">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-gray-900">{course.modules?.length || 0}</p>
            <p className="text-[9px] sm:text-xs text-gray-500">Modules</p>
          </div>
          <div className="text-center">
            <div className="bg-emerald-50 rounded-lg p-2 mb-1">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-gray-900">{course.enrolledStudents?.length || 0}</p>
            <p className="text-[9px] sm:text-xs text-gray-500">Students</p>
          </div>
          <div className="text-center">
            <div className="bg-amber-50 rounded-lg p-2 mb-1">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mx-auto" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-gray-900">{course.estimatedDuration || 0}h</p>
            <p className="text-[9px] sm:text-xs text-gray-500">Duration</p>
          </div>
        </div>

        {/* View Button */}
        <button
          onClick={() => onView(course)}
          className="group/btn w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 text-sm sm:text-base"
        >
          {isEnrolled ? (
            <>
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Continue Learning</span>
            </>
          ) : (
            <>
              <span>View Course</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-0.5 transition" />
            </>
          )}
        </button>
      </div>

      {/* Bottom Accent Line */}
      <div className={`h-1 bg-gradient-to-r ${levelConfig.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default CourseCard;