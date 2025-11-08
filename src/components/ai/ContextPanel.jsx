import { BookOpen, Target, TrendingUp, MapPin } from 'lucide-react';

const ContextPanel = ({ context, onUpdateContext }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
        <MapPin className="w-5 h-5 text-purple-600" />
        <span>Learning Context</span>
      </h3>

      <div className="space-y-3">
        {/* Current Lesson */}
        {context?.currentLesson && (
          <div className="bg-white rounded-lg p-3 border border-purple-100">
            <div className="flex items-start space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600">Current Lesson</p>
                <p className="text-sm font-medium text-gray-900">{context.currentLesson}</p>
              </div>
            </div>
          </div>
        )}

        {/* Current Topic */}
        {context?.currentTopic && (
          <div className="bg-white rounded-lg p-3 border border-purple-100">
            <div className="flex items-start space-x-2">
              <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600">Topic</p>
                <p className="text-sm font-medium text-gray-900">{context.currentTopic}</p>
              </div>
            </div>
          </div>
        )}

        {/* Student Level */}
        {context?.studentLevel && (
          <div className="bg-white rounded-lg p-3 border border-purple-100">
            <div className="flex items-start space-x-2">
              <TrendingUp className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600">Your Level</p>
                <p className="text-sm font-medium text-gray-900">{context.studentLevel}</p>
              </div>
            </div>
          </div>
        )}

        {/* Learning Goal */}
        {context?.learningGoal && (
          <div className="bg-white rounded-lg p-3 border border-purple-100">
            <div>
              <p className="text-xs text-gray-600 mb-1">Learning Goal</p>
              <p className="text-sm text-gray-900">{context.learningGoal}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!context?.currentLesson && !context?.currentTopic && !context?.studentLevel && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No context set</p>
            <p className="text-xs text-gray-400 mt-1">
              Start from a lesson to add context
            </p>
          </div>
        )}
      </div>

      {/* AI Tip */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-900">
          <strong>💡 Tip:</strong> The AI uses this context to give you more relevant and personalized answers!
        </p>
      </div>
    </div>
  );
};

export default ContextPanel;