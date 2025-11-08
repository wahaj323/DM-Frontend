import { GripVertical, Trash2, Plus, Minus, Volume2 } from 'lucide-react';
import { useState } from 'react';
import TTSButton from '../TTSButton';

const VocabularyBlock = ({ block, onUpdate, onDelete }) => {
  const [words, setWords] = useState(block.data.words || [
    { word: '', gender: '', meaning: '', exampleDe: '', exampleEn: '' }
  ]);

  const handleSave = () => {
    onUpdate(block.id, {
      ...block.data,
      words: words.filter(w => w.word.trim()) // Only save non-empty words
    });
  };

  const addWord = () => {
    setWords([...words, { word: '', gender: '', meaning: '', exampleDe: '', exampleEn: '' }]);
  };

  const removeWord = (index) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const updateWord = (index, field, value) => {
    const newWords = [...words];
    newWords[index][field] = value;
    setWords(newWords);
  };

  const genders = [
    { value: '', label: 'None' },
    { value: 'der', label: 'der (m)' },
    { value: 'die', label: 'die (f)' },
    { value: 'das', label: 'das (n)' },
    { value: 'die (pl)', label: 'die (pl)' }
  ];

  return (
    <div className="group relative bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-300 transition">
      {/* Drag Handle */}
      <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition cursor-move">
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase ml-8">Vocabulary</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={addWord}
            className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Word
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

      {/* Vocabulary List */}
      <div className="space-y-4">
        {words.map((word, index) => (
          <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    German Word *
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={word.word}
                      onChange={(e) => updateWord(index, 'word', e.target.value)}
                      onBlur={handleSave}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-semibold"
                      placeholder="e.g., Haus"
                    />
                    {word.word && <TTSButton text={word.word} />}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Gender/Article
                  </label>
                  <select
                    value={word.gender}
                    onChange={(e) => updateWord(index, 'gender', e.target.value)}
                    onBlur={handleSave}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    {genders.map(g => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {words.length > 1 && (
                <button
                  onClick={() => removeWord(index)}
                  className="ml-2 text-red-600 hover:bg-red-50 p-1 rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                English Meaning *
              </label>
              <input
                type="text"
                value={word.meaning}
                onChange={(e) => updateWord(index, 'meaning', e.target.value)}
                onBlur={handleSave}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                placeholder="e.g., house"
              />
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Example Sentence (German)
                </label>
                <div className="flex items-start space-x-2">
                  <textarea
                    value={word.exampleDe}
                    onChange={(e) => updateWord(index, 'exampleDe', e.target.value)}
                    onBlur={handleSave}
                    rows="2"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="e.g., Das Haus ist groß."
                  />
                  {word.exampleDe && <TTSButton text={word.exampleDe} />}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Example Translation (English)
                </label>
                <textarea
                  value={word.exampleEn}
                  onChange={(e) => updateWord(index, 'exampleEn', e.target.value)}
                  onBlur={handleSave}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm italic text-gray-600"
                  placeholder="e.g., The house is big."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabularyBlock;