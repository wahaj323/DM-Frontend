import { GripVertical, Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import TTSButton from '../TTSButton';

const DialogueBlock = ({ block, onUpdate, onDelete }) => {
  const [lines, setLines] = useState(block.data.lines || [
    { speaker: 'Person A', text: '', translation: '' }
  ]);

  const handleSave = () => {
    onUpdate(block.id, {
      ...block.data,
      lines
    });
  };

  const addLine = () => {
    setLines([...lines, { speaker: `Person ${String.fromCharCode(65 + lines.length)}`, text: '', translation: '' }]);
  };

  const removeLine = (index) => {
    setLines(lines.filter((_, i) => i !== index));
  };

  const updateLine = (index, field, value) => {
    const newLines = [...lines];
    newLines[index][field] = value;
    setLines(newLines);
  };

  const speakerColors = [
    'bg-blue-50 border-blue-200',
    'bg-green-50 border-green-200',
    'bg-purple-50 border-purple-200',
    'bg-orange-50 border-orange-200',
    'bg-pink-50 border-pink-200',
  ];

  return (
    <div className="group relative bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition">
      {/* Drag Handle */}
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition cursor-move">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase ml-8">Dialogue</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={addLine}
            className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Line
          </button>
          <button
            onClick={handleSave}
            className="text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => onDelete(block.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dialogue Lines */}
      <div className="space-y-3">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-3 ${speakerColors[index % speakerColors.length]}`}
          >
            <div className="flex items-start justify-between mb-2">
              <input
                type="text"
                value={line.speaker}
                onChange={(e) => updateLine(index, 'speaker', e.target.value)}
                onBlur={handleSave}
                className="px-2 py-1 text-sm font-semibold bg-white border border-gray-300 rounded"
                placeholder="Speaker name"
              />
              <div className="flex items-center space-x-2">
                {line.text && <TTSButton text={line.text} />}
                {lines.length > 1 && (
                  <button
                    onClick={() => removeLine(index)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <textarea
                value={line.text}
                onChange={(e) => updateLine(index, 'text', e.target.value)}
                onBlur={handleSave}
                rows="2"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                placeholder="Dialogue text (German)..."
              />
              <input
                type="text"
                value={line.translation}
                onChange={(e) => updateLine(index, 'translation', e.target.value)}
                onBlur={handleSave}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm text-gray-600 italic"
                placeholder="Translation (English)..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DialogueBlock;