import { ChevronLeft, ChevronRight, Home, Lock, CheckCircle, BookmarkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LessonNavigator = ({ 
  courseId, 
  modules, 
  currentLessonId, 
  progressRecords = [],
  unlockedLessons = [] 
}) => {
  const navigate = useNavigate();

  // Find current lesson position
  let currentModuleIndex = -1;
  let currentLessonIndex = -1;
  let prevLesson = null;
  let nextLesson = null;

  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    if (module.lessons) {
      for (let j = 0; j < module.lessons.length; j++) {
        const lesson = module.lessons[j];
        
        if (lesson._id === currentLessonId) {
          currentModuleIndex = i;
          currentLessonIndex = j;
          
          // Find previous unlocked lesson
          if (j > 0) {
            const prev = module.lessons[j - 1];
            if (unlockedLessons.some(l => l.toString() === prev._id)) {
              prevLesson = prev;
            }
          } else if (i > 0) {
            const prevModule = modules[i - 1];
            if (prevModule.lessons && prevModule.lessons.length > 0) {
              const prev = prevModule.lessons[prevModule.lessons.length - 1];
              if (unlockedLessons.some(l => l.toString() === prev._id)) {
                prevLesson = prev;
              }
            }
          }

          // Find next unlocked lesson
          if (j < module.lessons.length - 1) {
            const next = module.lessons[j + 1];
            if (unlockedLessons.some(l => l.toString() === next._id)) {
              nextLesson = next;
            }
          } else if (i < modules.length - 1) {
            const nextModule = modules[i + 1];
            if (nextModule.lessons && nextModule.lessons.length > 0) {
              const next = nextModule.lessons[0];
              if (unlockedLessons.some(l => l.toString() === next._id)) {
                nextLesson = next;
              }
            }
          }
          
          break;
        }
      }
      if (currentModuleIndex !== -1) break;
    }
  }

  const getLessonStatus = (lessonId) => {
    const progress = progressRecords.find(p => p.lessonId === lessonId);
    if (!progress) return 'not_started';
    return progress.status;
  };

  const isLessonUnlocked = (lessonId) => {
    return unlockedLessons.some(l => l.toString() === lessonId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Navigation Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Back to Course</span>
        </button>
      </div>

      {/* Lesson Navigation Buttons */}
      <div className="p-4 flex items-center justify-between border-b">
        <button
          onClick={() => prevLesson && navigate(`/student/lessons/${prevLesson._id}`)}
          disabled={!prevLesson}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <span className="text-sm text-gray-600">
          Lesson {currentLessonIndex + 1} of {modules[currentModuleIndex]?.lessons?.length || 0}
        </span>

        <button
          onClick={() => nextLesson && navigate(`/student/lessons/${nextLesson._id}`)}
          disabled={!nextLesson}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Module List */}
      <div className="max-h-96 overflow-y-auto">
        {modules.map((module, moduleIndex) => (
          <div key={module._id} className="border-b last:border-b-0">
            <div className="p-4 bg-gray-50">
              <h4 className="font-semibold text-gray-900">{module.title}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {module.lessons?.length || 0} lessons
              </p>
            </div>

            {module.lessons && module.lessons.length > 0 && (
              <div className="divide-y">
                {module.lessons.map((lesson, lessonIndex) => {
                  const status = getLessonStatus(lesson._id);
                  const isUnlocked = isLessonUnlocked(lesson._id);
                  const isCurrent = lesson._id === currentLessonId;

                  return (
                    <button
                      key={lesson._id}
                      onClick={() => isUnlocked && navigate(`/student/lessons/${lesson._id}`)}
                      disabled={!isUnlocked}
                      className={`w-full p-3 text-left flex items-center justify-between transition ${
                        isCurrent 
                          ? 'bg-primary-50 border-l-4 border-primary-600' 
                          : 'hover:bg-gray-50'
                      } ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <span className="text-sm text-gray-500 flex-shrink-0">
                          {lessonIndex + 1}
                        </span>
                        <span className={`text-sm truncate ${
                          isCurrent ? 'font-semibold text-gray-900' : 'text-gray-700'
                        }`}>
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {!isUnlocked && (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonNavigator;