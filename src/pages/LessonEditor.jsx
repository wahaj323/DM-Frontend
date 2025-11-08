import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Settings } from 'lucide-react';
import { courseAPI } from '../services/courseAPI';
import BlockEditor from '../components/editor/BlockEditor';
import LessonPreview from '../components/LessonPreview';

const LessonEditor = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [error, setError] = useState('');

  // TTS Settings
  const [ttsSettings, setTtsSettings] = useState({
    enabled: true,
    rate: 0.9,
    pitch: 1
  });

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    setLoading(true);
    try {
      const data = await courseAPI.getLesson(lessonId);
      setLesson(data);
      setBlocks(data.blocks || []);
      if (data.ttsSettings) {
        setTtsSettings(data.ttsSettings);
      }
    } catch (error) {
      console.error('Error fetching lesson:', error);
      alert('Failed to load lesson');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      await courseAPI.updateLesson(lessonId, {
        blocks,
        ttsSettings
      });
      alert('Lesson saved successfully!');
      fetchLesson();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save lesson');
    } finally {
      setSaving(false);
    }
  };

  const handleBlocksChange = (updatedBlocks) => {
    setBlocks(updatedBlocks);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
              {lesson.description && (
                <p className="text-gray-600 mt-1">{lesson.description}</p>
              )}
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {lesson.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  lesson.isLocked 
                    ? 'bg-gray-100 text-gray-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {lesson.isLocked ? 'Locked' : 'Unlocked'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition"
              >
                <Eye className="w-5 h-5" />
                <span>Preview</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 shadow-lg"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? 'Saving...' : 'Save Lesson'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* TTS Settings Panel */}
        {showSettings && (
          <div className="mb-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Text-to-Speech Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ttsSettings.enabled}
                    onChange={(e) => setTtsSettings({ ...ttsSettings, enabled: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable TTS</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Playback Speed: {ttsSettings.rate}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={ttsSettings.rate}
                  onChange={(e) => setTtsSettings({ ...ttsSettings, rate: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pitch: {ttsSettings.pitch}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={ttsSettings.pitch}
                  onChange={(e) => setTtsSettings({ ...ttsSettings, pitch: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Normal</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Block Editor */}
        <div className="bg-gray-50 rounded-lg">
          <BlockEditor blocks={blocks} onChange={handleBlocksChange} />
        </div>

        {/* Save Reminder */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Remember to save your changes before leaving this page. 
            Use the Preview button to see how students will view this lesson.
          </p>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <LessonPreview
          lesson={{ ...lesson, blocks }}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default LessonEditor;