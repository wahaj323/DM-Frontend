import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import ProgressBar from './ProgressBar';

const CourseProgress = ({ progress }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Course Progress</h3>
        <Award className={`w-8 h-8 ${
          progress.progressPercentage === 100 ? 'text-yellow-500' : 'text-gray-400'
        }`} />
      </div>

      {/* Main Progress */}
      <div className="mb-6">
        <ProgressBar percentage={progress.progressPercentage} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900">
              {progress.completedLessons}
            </span>
          </div>
          <p className="text-sm text-blue-700">
            of {progress.totalLessons} lessons
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-2xl font-bold text-purple-900">
              {progress.totalTimeSpent}
            </span>
          </div>
          <p className="text-sm text-purple-700">minutes studied</p>
        </div>
      </div>

      {/* In Progress */}
      {progress.inProgressLessons > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              {progress.inProgressLessons} lesson(s) in progress
            </span>
          </div>
        </div>
      )}

      {/* Next Lesson */}
      {progress.nextLesson && (
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg p-4">
          <p className="text-sm font-medium text-primary-900 mb-2">Up Next:</p>
          <p className="font-semibold text-gray-900">{progress.nextLesson.lessonTitle}</p>
          <p className="text-sm text-gray-600 mt-1">{progress.nextLesson.moduleTitle}</p>
        </div>
      )}

      {/* Completion Status */}
      {progress.progressPercentage === 100 && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <Award className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
          <p className="text-lg font-bold text-green-900 mb-1">Course Completed! 🎉</p>
          <p className="text-sm text-green-700">You can now generate your certificate</p>
        </div>
      )}
    </div>
  );
};

export default CourseProgress;