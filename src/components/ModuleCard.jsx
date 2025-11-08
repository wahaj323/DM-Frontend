import { FileText, ChevronDown, ChevronUp, Edit, Trash2, Plus, GripVertical } from 'lucide-react';
import { useState } from 'react';

const ModuleCard = ({ module, onEdit, onDelete, onAddLesson, onViewLesson, isTeacher }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Module Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {isTeacher && (
            <button className="cursor-move text-gray-400 hover:text-gray-600">
              <GripVertical className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
            {module.description && (
              <p className="text-sm text-gray-600 mt-1">{module.description}</p>
            )}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {module.lessons?.length || 0} lessons
              </span>
              {module.estimatedDuration > 0 && (
                <span>{module.estimatedDuration} min</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isTeacher && (
            <>
              <button
                onClick={() => onAddLesson(module)}
                className="p-2 text-primary-600 hover:bg-primary-50 rounded transition"
                title="Add Lesson"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={() => onEdit(module)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded transition"
                title="Edit Module"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(module._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                title="Delete Module"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded transition"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Lessons List */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          {module.lessons && module.lessons.length > 0 ? (
            <div className="space-y-2">
              {module.lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className="bg-white p-3 rounded border border-gray-200 hover:border-primary-300 transition cursor-pointer"
                  onClick={() => onViewLesson && onViewLesson(lesson)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      {isTeacher && (
                        <button className="cursor-move text-gray-400 hover:text-gray-600">
                          <GripVertical className="w-4 h-4" />
                        </button>
                      )}
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{lesson.title}</p>
                        {lesson.description && (
                          <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        lesson.isLocked 
                          ? 'bg-gray-100 text-gray-600' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {lesson.isLocked ? 'Locked' : 'Unlocked'}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {lesson.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>No lessons yet</p>
              {isTeacher && (
                <button
                  onClick={() => onAddLesson(module)}
                  className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Add your first lesson
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;