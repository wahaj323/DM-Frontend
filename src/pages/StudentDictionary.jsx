import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Zap, 
  Filter,
  BookMarked,
  Sparkles,
  TrendingUp,
  Target,
  Award,
  X
} from 'lucide-react';
import { dictionaryAPI } from '../services/dictionaryAPI';
import VocabCard from '../components/VocabCard';
import DictionaryStats from '../components/DictionaryStats';
import FlashcardMode from '../components/FlashcardMode';

const StudentDictionary = () => {
  const [words, setWords] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);

  useEffect(() => {
    fetchDictionary();
    fetchStats();
  }, [filterStatus]);

  const fetchDictionary = async () => {
    setLoading(true);
    try {
      const data = await dictionaryAPI.getDictionary({
        search: searchTerm,
        status: filterStatus,
        limit: 100
      });
      setWords(data.items);
    } catch (error) {
      console.error('Error fetching dictionary:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await dictionaryAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDictionary();
  };

  const handleUpdateEntry = async (id, data) => {
    try {
      await dictionaryAPI.updateEntry(id, data);
      fetchDictionary();
      fetchStats();
    } catch (error) {
      alert('Failed to update entry');
    }
  };

  const handleDeleteEntry = async (id) => {
    if (confirm('Remove this word from your dictionary?')) {
      try {
        await dictionaryAPI.deleteEntry(id);
        fetchDictionary();
        fetchStats();
        alert('Word removed from dictionary');
      } catch (error) {
        alert('Failed to remove word');
      }
    }
  };

  const handlePractice = async (id, correct) => {
    try {
      await dictionaryAPI.recordPractice(id, correct);
      fetchStats();
    } catch (error) {
      console.error('Error recording practice:', error);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['German', 'Gender', 'English', 'Example (DE)', 'Example (EN)', 'Status', 'Notes'].join(','),
      ...words.map(entry => {
        const vocab = entry.vocabItemId;
        return [
          vocab.word,
          vocab.gender || '',
          vocab.meaning,
          vocab.exampleDe || '',
          vocab.exampleEn || '',
          entry.status,
          entry.notes || ''
        ].map(field => `"${field}"`).join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-german-dictionary-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Header */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1.5 sm:p-2">
                      <BookMarked className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                      Personal Collection
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                    My German Dictionary
                  </h1>
                  <p className="text-xs sm:text-sm lg:text-base text-purple-100">
                    Build and master your vocabulary collection
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center border border-white/30">
                    <div className="text-lg sm:text-2xl font-bold">{stats?.totalWords || 0}</div>
                    <div className="text-[9px] sm:text-xs text-purple-100">Words</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="mb-6 sm:mb-8">
            <DictionaryStats stats={stats} />
          </div>
        )}

        {/* Actions Bar - Fully Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your dictionary..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 sm:pl-10 w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base transition"
                />
              </div>
            </form>

            {/* Filter & Actions Row */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Filter Dropdown */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base transition flex-1 sm:flex-initial"
              >
                <option value="">All Status</option>
                <option value="new">📌 New</option>
                <option value="learning">📚 Learning</option>
                <option value="mastered">⭐ Mastered</option>
              </select>

              {/* Action Buttons - Responsive Grid */}
              <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-2 flex-1">
                <button
                  onClick={() => setShowFlashcards(true)}
                  disabled={words.length === 0}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95 text-xs sm:text-sm"
                >
                  <Zap className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Practice</span>
                  <span className="sm:hidden">Practice</span>
                </button>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition shadow-md hover:shadow-lg active:scale-95 text-xs sm:text-sm"
                >
                  <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Add Word</span>
                  <span className="sm:hidden">Add</span>
                </button>

                <button
                  onClick={handleExport}
                  disabled={words.length === 0}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95 text-xs sm:text-sm"
                >
                  <Download className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Export</span>
                  <span className="sm:hidden">Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Words Grid - Responsive */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 animate-pulse">
                <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : words.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 lg:p-16 text-center">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookMarked className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              {searchTerm || filterStatus ? 'No words found' : 'Your dictionary is empty'}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
              {searchTerm || filterStatus
                ? 'Try adjusting your search or filter'
                : 'Add words manually or complete lessons to build your vocabulary'}
            </p>
            {!searchTerm && !filterStatus && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Add Your First Word
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {words.map((entry) => (
              <VocabCard
                key={entry._id}
                entry={entry}
                onUpdate={handleUpdateEntry}
                onDelete={handleDeleteEntry}
                onPractice={handlePractice}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Word Modal */}
      {showAddModal && (
        <AddWordModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchDictionary();
            fetchStats();
          }}
        />
      )}

      {/* Flashcard Mode */}
      {showFlashcards && words.length > 0 && (
        <FlashcardMode
          words={words}
          onClose={() => {
            setShowFlashcards(false);
            fetchDictionary();
            fetchStats();
          }}
          onPractice={handlePractice}
        />
      )}
    </div>
  );
};

// Add Word Modal Component - Mobile Responsive
const AddWordModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    word: '',
    gender: '',
    meaning: '',
    exampleDe: '',
    exampleEn: '',
    tags: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.word || !formData.meaning) {
      setError('Word and meaning are required');
      return;
    }

    setLoading(true);

    try {
      const tags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : [];
      await dictionaryAPI.addWord({
        ...formData,
        tags
      });
      alert('Word added to dictionary!');
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add word');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold">Add New Word</h2>
              <p className="text-purple-100 mt-1 text-xs sm:text-sm">Add a word to your personal dictionary</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition flex-shrink-0"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                German Word *
              </label>
              <input
                type="text"
                name="word"
                value={formData.word}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="e.g., Haus"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Gender/Article
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="">None</option>
                <option value="der">der (m)</option>
                <option value="die">die (f)</option>
                <option value="das">das (n)</option>
                <option value="die (pl)">die (pl)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              English Meaning *
            </label>
            <input
              type="text"
              name="meaning"
              value={formData.meaning}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., house"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Example Sentence (German)
            </label>
            <textarea
              name="exampleDe"
              value={formData.exampleDe}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., Das Haus ist groß."
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Example Translation (English)
            </label>
            <textarea
              name="exampleEn"
              value={formData.exampleEn}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., The house is big."
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              placeholder="e.g., noun, beginner, family"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition disabled:opacity-50 shadow-md hover:shadow-lg active:scale-95 text-sm sm:text-base"
            >
              {loading ? 'Adding...' : 'Add Word'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition active:scale-95 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentDictionary;