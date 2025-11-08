import { Volume2, Edit, Trash2, Check, BookOpen, Star, TrendingUp, X } from 'lucide-react';
import { useState } from 'react';
import TTSButton from './editor/TTSButton';

const VocabCard = ({ entry, onUpdate, onDelete, onPractice }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [notes, setNotes] = useState(entry.notes || '');

  const vocab = entry.vocabItemId;

  const handleSaveNotes = async () => {
    await onUpdate(entry._id, { notes });
    setShowEdit(false);
  };

  const handleStatusChange = async (newStatus) => {
    await onUpdate(entry._id, { status: newStatus });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'new':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          border: 'border-blue-200',
          gradient: 'from-blue-500 to-cyan-500',
          icon: '📌',
          label: 'New'
        };
      case 'learning':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-700',
          border: 'border-amber-200',
          gradient: 'from-amber-500 to-yellow-500',
          icon: '📚',
          label: 'Learning'
        };
      case 'mastered':
        return {
          bg: 'bg-emerald-100',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          gradient: 'from-emerald-500 to-teal-500',
          icon: '⭐',
          label: 'Mastered'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          border: 'border-gray-200',
          gradient: 'from-gray-500 to-gray-600',
          icon: '📝',
          label: 'Unknown'
        };
    }
  };

  const getGenderConfig = (gender) => {
    switch (gender) {
      case 'der':
        return { color: 'text-blue-600', bg: 'bg-blue-100', label: 'der (m)' };
      case 'die':
        return { color: 'text-rose-600', bg: 'bg-rose-100', label: 'die (f)' };
      case 'das':
        return { color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'das (n)' };
      case 'die (pl)':
        return { color: 'text-purple-600', bg: 'bg-purple-100', label: 'die (pl)' };
      default:
        return { color: 'text-gray-600', bg: 'bg-gray-100', label: '' };
    }
  };

  const statusConfig = getStatusConfig(entry.status);
  const genderConfig = vocab.gender ? getGenderConfig(vocab.gender) : null;
  const accuracy = entry.practiceCount > 0 
    ? Math.round((entry.correctCount / entry.practiceCount) * 100) 
    : 0;

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-200 overflow-hidden">
      {/* Status Indicator Bar */}
      <div className={`h-1.5 bg-gradient-to-r ${statusConfig.gradient}`}></div>

      <div className="p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            {/* Gender Badge */}
            {genderConfig && (
              <div className={`inline-flex items-center gap-1 ${genderConfig.bg} ${genderConfig.color} px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm font-bold mb-2`}>
                {genderConfig.label}
              </div>
            )}
            
            {/* Word & TTS */}
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                {vocab.word}
              </h3>
              <TTSButton text={vocab.word} />
            </div>
            
            {/* Meaning */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
              {vocab.meaning}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => setShowEdit(!showEdit)}
              className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                showEdit 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'text-gray-400 hover:bg-purple-50 hover:text-purple-600'
              }`}
              title="Edit notes"
            >
              <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => onDelete(entry._id)}
              className="p-1.5 sm:p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
              title="Remove from dictionary"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-3 sm:mb-4">
          <span className={`inline-flex items-center gap-1 sm:gap-1.5 ${statusConfig.bg} ${statusConfig.text} px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold border ${statusConfig.border}`}>
            <span>{statusConfig.icon}</span>
            <span>{statusConfig.label}</span>
            {entry.status === 'mastered' && <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />}
          </span>
        </div>

        {/* Examples */}
        {vocab.exampleDe && (
          <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg sm:rounded-xl border border-purple-100">
            <div className="flex items-start gap-2 mb-1.5 sm:mb-2">
              <p className="text-xs sm:text-sm lg:text-base text-gray-800 flex-1 leading-relaxed">{vocab.exampleDe}</p>
              <TTSButton text={vocab.exampleDe} />
            </div>
            {vocab.exampleEn && (
              <p className="text-[10px] sm:text-xs text-gray-600 italic leading-relaxed">{vocab.exampleEn}</p>
            )}
          </div>
        )}

        {/* Notes Section */}
        {showEdit ? (
          <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-700">
                Personal Notes
              </label>
              <button
                onClick={() => setShowEdit(false)}
                className="p-1 hover:bg-blue-100 rounded transition"
              >
                <X className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full px-2.5 sm:px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs sm:text-sm resize-none"
              placeholder="Add your notes here..."
            />
            <button
              onClick={handleSaveNotes}
              className="mt-2 flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transition active:scale-95"
            >
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Save Notes</span>
            </button>
          </div>
        ) : entry.notes ? (
          <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg sm:rounded-xl">
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold">📝 Note:</span> {entry.notes}
            </p>
          </div>
        ) : null}

        {/* Stats Section - Enhanced */}
        <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg sm:rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Practice Stats</span>
            {accuracy > 0 && (
              <div className="flex items-center gap-1">
                <TrendingUp className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                  accuracy >= 80 ? 'text-emerald-600' : accuracy >= 60 ? 'text-amber-600' : 'text-gray-600'
                }`} />
                <span className={`text-xs sm:text-sm font-bold ${
                  accuracy >= 80 ? 'text-emerald-600' : accuracy >= 60 ? 'text-amber-600' : 'text-gray-600'
                }`}>
                  {accuracy}%
                </span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white rounded-lg p-2 sm:p-2.5 text-center border border-gray-200">
              <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">{entry.practiceCount}</div>
              <div className="text-[9px] sm:text-xs text-gray-500 mt-0.5">Total</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 sm:p-2.5 text-center border border-emerald-200">
              <div className="text-base sm:text-lg lg:text-xl font-bold text-emerald-600">{entry.correctCount}</div>
              <div className="text-[9px] sm:text-xs text-emerald-600 mt-0.5">Correct</div>
            </div>
            <div className="bg-red-50 rounded-lg p-2 sm:p-2.5 text-center border border-red-200">
              <div className="text-base sm:text-lg lg:text-xl font-bold text-red-600">{entry.incorrectCount}</div>
              <div className="text-[9px] sm:text-xs text-red-600 mt-0.5">Wrong</div>
            </div>
          </div>
        </div>

        {/* Status Change Dropdown & Source */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
          {/* Source Info */}
          {entry.addedFromLesson ? (
            <div className="flex items-center text-[10px] sm:text-xs text-gray-500 gap-1 min-w-0 flex-1 sm:flex-initial">
              <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span className="truncate">From: {entry.addedFromLesson.title}</span>
            </div>
          ) : (
            <div className="flex items-center text-[10px] sm:text-xs text-gray-500 gap-1 flex-shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Manually added</span>
            </div>
          )}

          {/* Status Dropdown */}
          <select
            value={entry.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`${statusConfig.bg} ${statusConfig.text} text-xs sm:text-sm font-semibold border-2 ${statusConfig.border} rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 cursor-pointer hover:opacity-80 transition focus:ring-2 focus:ring-purple-500 focus:outline-none flex-shrink-0 w-full sm:w-auto`}
          >
            <option value="new">📌 New</option>
            <option value="learning">📚 Learning</option>
            <option value="mastered">⭐ Mastered</option>
          </select>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className={`h-1 bg-gradient-to-r ${statusConfig.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
    </div>
  );
};

export default VocabCard;