import { GripVertical, Trash2, StickyNote } from 'lucide-react';
import { useState } from 'react';

const NoteBlock = ({ block, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(!block.data.content);
  const [content, setContent] = useState(block.data.content || '');
  const [noteType, setNoteType] = useState(block.data.noteType || 'info');

  const handleSave = () => {
    if (content.trim()) {
      onUpdate(block.id, { ...block.data, content, noteType });
      setIsEditing(false);
    }
  };

  const noteStyles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      icon: 'text-blue-600'
    },
    warning: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      icon: 'text-orange-600'
    },
    tip: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      icon: 'text-green-600'
    },
    important: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      icon: 'text-red-600'
    }
  };

  const currentStyle = noteStyles[noteType];

  return (
    <div className="group relative bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition">
      {/* Drag Handle */}
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition cursor-move">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 ml-8">
          <span className="text-xs font-medium text-gray-500 uppercase">Note</span>
          <select
            value={noteType}
            onChange={(e) => {
              setNoteType(e.target.value);
              if (!isEditing) {
                onUpdate(block.id, { ...block.data, noteType: e.target.value });
              }
            }}
            className="text-xs border border-gray-300 rounded px-2 py-1"
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="tip">Tip</option>
            <option value="important">Important</option>
          </select>
        </div>

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
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter note content..."
            autoFocus
          />
          <button
            onClick={handleSave}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Save
          </button>
        </div>
      ) : (
        <div className={`${currentStyle.bg} border-2 ${currentStyle.border} rounded-lg p-4`}>
          <div className="flex items-start space-x-3">
            <StickyNote className={`w-5 h-5 ${currentStyle.icon} flex-shrink-0 mt-1`} />
            <p className="flex-1 text-gray-700 whitespace-pre-wrap">{content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteBlock;