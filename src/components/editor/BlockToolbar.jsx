import { 
  Type, 
  Image, 
  Table, 
  MessageSquare, 
  BookOpen, 
  AlertCircle,
  StickyNote,
  Heading1,
  Heading2,
  Heading3,
  Plus
} from 'lucide-react';
import { useState } from 'react';

const BlockToolbar = ({ onAddBlock }) => {
  const [showMenu, setShowMenu] = useState(false);

  const blockTypes = [
    { type: 'heading', label: 'Heading', icon: Heading1, color: 'text-blue-600' },
    { type: 'paragraph', label: 'Paragraph', icon: Type, color: 'text-gray-600' },
    { type: 'image', label: 'Image', icon: Image, color: 'text-green-600' },
    { type: 'table', label: 'Table', icon: Table, color: 'text-purple-600' },
    { type: 'dialogue', label: 'Dialogue', icon: MessageSquare, color: 'text-orange-600' },
    { type: 'vocabulary', label: 'Vocabulary', icon: BookOpen, color: 'text-red-600' },
    { type: 'grammar', label: 'Grammar Box', icon: AlertCircle, color: 'text-yellow-600' },
    { type: 'note', label: 'Note', icon: StickyNote, color: 'text-pink-600' },
  ];

  const handleAddBlock = (type) => {
    onAddBlock(type);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-lg"
      >
        <Plus className="w-5 h-5" />
        <span>Add Block</span>
      </button>

      {showMenu && (
        <>
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2">
            {blockTypes.map((block) => (
              <button
                key={block.type}
                onClick={() => handleAddBlock(block.type)}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition"
              >
                <block.icon className={`w-5 h-5 ${block.color}`} />
                <span className="font-medium text-gray-900">{block.label}</span>
              </button>
            ))}
          </div>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          ></div>
        </>
      )}
    </div>
  );
};

export default BlockToolbar;