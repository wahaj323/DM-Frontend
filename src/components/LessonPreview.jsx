import { X } from 'lucide-react';
import TTSButton from './editor/TTSButton';

const LessonPreview = ({ lesson, onClose }) => {
  const renderBlock = (block) => {
    switch (block.type) {
      case 'heading':
        return <HeadingPreview block={block} />;
      case 'paragraph':
        return <ParagraphPreview block={block} />;
      case 'image':
        return <ImagePreview block={block} />;
      case 'table':
        return <TablePreview block={block} />;
      case 'dialogue':
        return <DialoguePreview block={block} />;
      case 'vocabulary':
        return <VocabularyPreview block={block} />;
      case 'grammar':
        return <GrammarPreview block={block} />;
      case 'note':
        return <NotePreview block={block} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold">{lesson.title}</h2>
            {lesson.description && (
              <p className="text-primary-100 mt-1">{lesson.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {lesson.blocks && lesson.blocks.length > 0 ? (
            lesson.blocks
              .sort((a, b) => a.order - b.order)
              .map((block) => (
                <div key={block.id}>{renderBlock(block)}</div>
              ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No content to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Preview Components for each block type
const HeadingPreview = ({ block }) => {
  const HeadingTag = `h${block.data.level}`;
  const sizes = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl'
  };

  return (
    <HeadingTag className={`font-bold text-gray-900 ${sizes[block.data.level]}`}>
      {block.data.text}
    </HeadingTag>
  );
};

const ParagraphPreview = ({ block }) => {
  return (
    <div className="flex items-start space-x-3">
      <p className="flex-1 text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
        {block.data.text}
      </p>
      {block.data.hasAudio && <TTSButton text={block.data.text} />}
    </div>
  );
};

const ImagePreview = ({ block }) => {
  if (!block.data.url) return null;

  return (
    <div className="space-y-2">
      <img
        src={block.data.url}
        alt={block.data.alt || 'Lesson image'}
        className="w-full rounded-lg shadow-lg"
      />
      {block.data.caption && (
        <p className="text-center text-sm text-gray-600 italic">{block.data.caption}</p>
      )}
    </div>
  );
};

const TablePreview = ({ block }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {block.data.headers.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.data.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                  {cell.type === 'image' ? (
                    cell.content ? (
                      <img
                        src={cell.content}
                        alt="Table cell"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-sm text-gray-500">No image</span>
                      </div>
                    )
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="flex-1">{cell.content}</span>
                      {cell.content && <TTSButton text={cell.content} />}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DialoguePreview = ({ block }) => {
  const speakerColors = [
    'bg-blue-50 border-blue-200',
    'bg-green-50 border-green-200',
    'bg-purple-50 border-purple-200',
    'bg-orange-50 border-orange-200',
    'bg-pink-50 border-pink-200',
  ];

  return (
    <div className="space-y-3">
      {block.data.lines.map((line, index) => (
        <div key={index} className={`border-2 rounded-lg p-4 ${speakerColors[index % speakerColors.length]}`}>
          <div className="flex items-start justify-between mb-2">
            <span className="font-semibold text-gray-900">{line.speaker}</span>
            {line.text && <TTSButton text={line.text} />}
          </div>
          <p className="text-gray-800 text-lg mb-2">{line.text}</p>
          {line.translation && (
            <p className="text-gray-600 text-sm italic">{line.translation}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const VocabularyPreview = ({ block }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {block.data.words.map((word, index) => (
        <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-xl font-bold text-gray-900">
                {word.gender && <span className="text-primary-600">{word.gender} </span>}
                {word.word}
              </h4>
              <p className="text-gray-700">{word.meaning}</p>
            </div>
            {word.word && <TTSButton text={word.word} />}
          </div>

          {word.exampleDe && (
            <div className="mt-3 pt-3 border-t border-purple-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-800 mb-1">{word.exampleDe}</p>
                  {word.exampleEn && (
                    <p className="text-gray-600 text-sm italic">{word.exampleEn}</p>
                  )}
                </div>
                {word.exampleDe && <TTSButton text={word.exampleDe} />}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const GrammarPreview = ({ block }) => {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
      {block.data.title && (
        <h3 className="text-xl font-bold text-gray-900 mb-3">{block.data.title}</h3>
      )}
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{block.data.content}</p>
    </div>
  );
};

const NotePreview = ({ block }) => {
  const noteStyles = {
    info: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-900' },
    warning: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-900' },
    tip: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-900' },
    important: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-900' }
  };

  const style = noteStyles[block.data.noteType] || noteStyles.info;

  return (
    <div className={`${style.bg} border-2 ${style.border} rounded-lg p-4`}>
      <p className={`${style.text} leading-relaxed whitespace-pre-wrap`}>
        {block.data.content}
      </p>
    </div>
  );
};

export default LessonPreview;