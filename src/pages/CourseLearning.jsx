import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { progressAPI } from '../services/progressAPI';
import { courseAPI } from '../services/courseAPI';
import CourseProgress from '../components/CourseProgress';
import QuizSection from '../components/QuizSection'; // ✅ Added Import
import { 
  BookOpen, 
  Lock, 
  CheckCircle, 
  PlayCircle, 
  ChevronDown, 
  ChevronUp,
  Award,
  Clock
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedModules, setExpandedModules] = useState(new Set());

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [courseData, progressData] = await Promise.all([
        courseAPI.getCourseById(courseId),
        progressAPI.getCourseProgress(courseId)
      ]);
      
      setCourse(courseData);
      setProgress(progressData);
      
      // Expand first module by default
      if (courseData.modules.length > 0) {
        setExpandedModules(new Set([courseData.modules[0]._id]));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonStatus = (lessonId) => {
    const lessonProgress = progress?.progressRecords.find(p => 
      p.lessonId.toString() === lessonId.toString()
    );
    return lessonProgress?.status || 'not_started';
  };

  const isLessonUnlocked = (lessonId) => {
    return user?.unlockedLessons?.some(l => l.toString() === lessonId.toString());
  };

  const handleLessonClick = (lessonId) => {
    if (isLessonUnlocked(lessonId)) {
      navigate(`/student/lessons/${lessonId}`);
    }
  };

  const handleGenerateCertificate = () => {
    navigate(`/student/certificates/${courseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <button
            onClick={() => navigate('/student/courses')}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center space-x-2"
          >
            <span>← Back to My Courses</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{progress.totalLessons} lessons</span>
                </span>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:w-80">
              <CourseProgress progress={progress} />
            </div>
          </div>

          {progress.progressPercentage === 100 && (
            <div className="mt-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Congratulations! 🎉</p>
                    <p className="text-sm text-gray-600">You've completed this course</p>
                  </div>
                </div>
                <button
                  onClick={handleGenerateCertificate}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  Get Certificate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
          </div>

          <div className="divide-y">
            {course.modules.map((module, moduleIndex) => {
              const isExpanded = expandedModules.has(module._id);
              const moduleLessons = module.lessons || [];
              const completedInModule = moduleLessons.filter(lesson => 
                getLessonStatus(lesson._id) === 'completed'
              ).length;

              return (
                <div key={module._id}>
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module._id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">
                          {moduleIndex + 1}
                        </span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">
                          {completedInModule}/{moduleLessons.length} lessons completed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {completedInModule === moduleLessons.length && moduleLessons.length > 0 && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Module Lessons */}
                  {isExpanded && (
                    <div className="bg-gray-50 divide-y">
                      {moduleLessons.map((lesson, lessonIndex) => {
                        const status = getLessonStatus(lesson._id);
                        const isUnlocked = isLessonUnlocked(lesson._id);

                        return (
                          <button
                            key={lesson._id}
                            onClick={() => handleLessonClick(lesson._id)}
                            disabled={!isUnlocked}
                            className={`w-full px-6 py-4 flex items-center justify-between transition ${
                              isUnlocked 
                                ? 'hover:bg-gray-100 cursor-pointer' 
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center border">
                                <span className="text-sm text-gray-600">
                                  {lessonIndex + 1}
                                </span>
                              </div>
                              
                              <div className="text-left">
                                <p className="font-medium text-gray-900">{lesson.title}</p>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className="text-xs text-gray-500 capitalize">
                                    {lesson.type}
                                  </span>
                                  {lesson.duration && (
                                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{lesson.duration} min</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {status === 'completed' && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {status === 'in_progress' && (
                                <PlayCircle className="w-5 h-5 text-blue-600" />
                              )}
                              {!isUnlocked && (
                                <Lock className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </button>
                        );
                      })}

                      {moduleLessons.length === 0 && (
                        <div className="px-6 py-8 text-center text-gray-500">
                          No lessons in this module yet
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {course.modules.length === 0 && (
              <div className="px-6 py-12 text-center text-gray-500">
                No modules available in this course yet
              </div>
            )}
          </div>
        </div>

        {/* ✅ Quizzes Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Course Quizzes</h2>
          </div>

          {/* Fetch and display quizzes here */}
          <QuizSection courseId={courseId} />
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
