import { Clock, Award, CheckCircle, Lock, Edit, Trash2, Eye } from 'lucide-react';

const QuizCard = ({ 
  quiz, 
  onStart, 
  onEdit, 
  onDelete, 
  onView,
  isTeacher = false,
  attempts = 0,
  bestScore = null 
}) => {
  // ✅ Fixed: Check both remainingAttempts and attempts count
  const maxAttempts = quiz.settings?.maxAttempts || 3;
  const canAttempt = (maxAttempts === 0) || (attempts < maxAttempts);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Header */}
      <div className={`p-4 ${
        quiz.published 
          ? 'bg-gradient-to-r from-primary-500 to-primary-600' 
          : 'bg-gray-400'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">
              {quiz.title}
            </h3>
            {quiz.description && (
              <p className="text-sm text-white/90 line-clamp-2">
                {quiz.description}
              </p>
            )}
          </div>
          {!quiz.published && (
            <span className="ml-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold text-white">
              Draft
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {quiz.settings.timeLimit} min
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Award className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {quiz.questionCount} questions
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {quiz.totalPoints} points
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-700">
              Pass: {quiz.settings.passingScore}%
            </span>
          </div>
        </div>

        {/* Student specific info */}
        {!isTeacher && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Attempts:</span>
              <span className="font-semibold text-gray-900">
                {attempts}/{quiz.settings.maxAttempts === 0 ? '∞' : quiz.settings.maxAttempts}
              </span>
            </div>
            {bestScore !== null && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Best Score:</span>
                <span className={`font-semibold ${
                  bestScore >= quiz.settings.passingScore 
                    ? 'text-green-600' 
                    : 'text-orange-600'
                }`}>
                  {bestScore}%
                </span>
              </div>
            )}
          </div>
        )}

        {/* Teacher specific info */}
        {isTeacher && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Total Attempts:</span>
              <span className="font-semibold text-gray-900">
                {quiz.totalAttempts || 0}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Average Score:</span>
              <span className="font-semibold text-gray-900">
                {quiz.averageScore || 0}%
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          {isTeacher ? (
            <>
              <div className="flex gap-2">
                <button
                  onClick={() => onView(quiz)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => onEdit(quiz)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
              <button
                onClick={() => onDelete(quiz)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onStart(quiz)}
              disabled={!canAttempt || !quiz.published}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition ${
                canAttempt && quiz.published
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {!canAttempt && quiz.published ? (
                <>
                  <Lock className="w-5 h-5" />
                  <span>No Attempts Left</span>
                </>
              ) : !quiz.published ? (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Not Available</span>
                </>
              ) : (
                <>
                  <Award className="w-5 h-5" />
                  <span>Start Quiz</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;