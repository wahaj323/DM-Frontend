import { GripVertical, Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const GrammarBox = ({ block, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(!block.data.title);
  const [title, setTitle] = useState(block.data.title || '');
  const [content, setContent] = useState(block.data.content || '');

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onUpdate(block.id, { ...block.data, title, content });
      setIsEditing(false);
    }
  };

  return (
    <div className="group relative bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition">
      {/* Drag Handle */}
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition cursor-move">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase ml-8">Grammar Box</span>
        <div className="flex items-center space-x-2">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(block.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-semibold"
            placeholder="Grammar rule title..."
            autoFocus
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Explain the grammar rule..."
          />
          <button
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              {title && <h4 className="font-bold text-gray-900 mb-2">{title}</h4>}
              <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarBox;