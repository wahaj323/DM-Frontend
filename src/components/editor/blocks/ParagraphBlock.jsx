import { GripVertical, Trash2, Volume2 } from 'lucide-react';
import { useState } from 'react';
import TTSButton from '../TTSButton';

const ParagraphBlock = ({ block, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(!block.data.text);
  const [text, setText] = useState(block.data.text || '');
  const [hasAudio, setHasAudio] = useState(block.data.hasAudio || false);

  const handleSave = () => {
    if (text.trim()) {
      onUpdate(block.id, { ...block.data, text, hasAudio });
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
        <div className="flex items-center space-x-2 ml-8">
          <span className="text-xs font-medium text-gray-500 uppercase">Paragraph</span>
          <label className="flex items-center space-x-1 text-xs">
            <input
              type="checkbox"
              checked={hasAudio}
              onChange={(e) => {
                setHasAudio(e.target.checked);
                if (!isEditing) {
                  onUpdate(block.id, { ...block.data, hasAudio: e.target.checked });
                }
              }}
              className="rounded"
            />
            <Volume2 className="w-3 h-3" />
            <span>Audio</span>
          </label>
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
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSave}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter paragraph text..."
            autoFocus
          />
          <button
            onClick={handleSave}
            className="mt-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-start space-x-3">
          <p className="flex-1 text-gray-700 whitespace-pre-wrap">{block.data.text}</p>
          {hasAudio && <TTSButton text={block.data.text} />}
        </div>
      )}
    </div>
  );
};

export default ParagraphBlock;