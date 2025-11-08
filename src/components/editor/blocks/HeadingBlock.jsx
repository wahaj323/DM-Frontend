import { GripVertical, Trash2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const HeadingBlock = ({ block, onUpdate, onDelete, onMove }) => {
  const [isEditing, setIsEditing] = useState(!block.data.text);
  const [text, setText] = useState(block.data.text || '');
  const [level, setLevel] = useState(block.data.level || 2);

  const handleSave = () => {
    if (text.trim()) {
      onUpdate(block.id, { ...block.data, text, level });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const HeadingTag = `h${level}`;
  const headingSizes = {
    1: 'text-3xl',
    2: 'text-2xl',
    3: 'text-xl'
  };

  return (
    <div className="group relative bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition">
      {/* Drag Handle */}
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition cursor-move">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2 ml-8">
          <span className="text-xs font-medium text-gray-500 uppercase">Heading</span>
          <select
            value={level}
            onChange={(e) => {
              setLevel(parseInt(e.target.value));
              if (!isEditing) {
                onUpdate(block.id, { ...block.data, level: parseInt(e.target.value) });
              }
            }}
            className="text-xs border border-gray-300 rounded px-2 py-1"
          >
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
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
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-bold ${headingSizes[level]}`}
            placeholder="Enter heading text..."
            autoFocus
          />
        </div>
      ) : (
        <HeadingTag className={`font-bold text-gray-900 ${headingSizes[level]}`}>
          {block.data.text}
        </HeadingTag>
      )}
    </div>
  );
};

export default HeadingBlock;