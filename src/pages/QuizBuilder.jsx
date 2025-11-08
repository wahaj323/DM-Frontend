import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save, Eye } from 'lucide-react';
import { quizAPI } from '../services/quizAPI';
import { courseAPI } from '../services/courseAPI';

const QuizBuilder = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [settings, setSettings] = useState({
    timeLimit: 30,
    passingScore: 70,
    maxAttempts: 3,
    showAnswers: true,
    showScore: true,
    shuffleQuestions: false,
    shuffleOptions: false,
    allowReview: true
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCourse();
    if (quizId) {
      fetchQuiz();
    }
  }, [courseId, quizId]);

  const fetchCourse = async () => {
    try {
      const data = await courseAPI.getCourse(courseId);
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const data = await quizAPI.getQuiz(quizId);
      setTitle(data.title);
      setDescription(data.description);
      setQuestions(data.questions);
      setSettings(data.settings);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = (type) => {
    const newQuestion = {
      id: Date.now().toString(),
      type,
      question: '',
      points: 1,
      order: questions.length,
      explanation: '',
      // Type-specific defaults
      ...(type === 'mcq' && { options: ['', '', '', ''], correctAnswer: 0 }),
      ...(type === 'fill_blank' && { blanks: [''], caseSensitive: false }),
      ...(type === 'matching' && { pairs: [{ left: '', right: '' }] }),
      ...(type === 'true_false' && { isTrue: true })
    };
    
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateQuestionData = (index, field, value) => {
    const updated = [...questions];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setQuestions(updated);
  };

  const deleteQuestion = (index) => {
    if (confirm('Delete this question?')) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSave = async (publish = false) => {
    if (!title.trim()) {
      alert('Please enter a quiz title');
      return;
    }

    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        alert(`Question ${i + 1}: Please enter a question`);
        return;
      }

      if (q.type === 'mcq') {
        if (q.options.some(opt => !opt.trim())) {
          alert(`Question ${i + 1}: All options must be filled`);
          return;
        }
      }

      if (q.type === 'fill_blank') {
        if (q.blanks.some(blank => !blank.trim())) {
          alert(`Question ${i + 1}: All blanks must be filled`);
          return;
        }
      }

      if (q.type === 'matching') {
        if (q.pairs.some(p => !p.left.trim() || !p.right.trim())) {
          alert(`Question ${i + 1}: All matching pairs must be filled`);
          return;
        }
      }
    }

    try {
      setSaving(true);
      const quizData = {
        title,
        description,
        courseId,
        questions,
        settings,
        published: publish
      };

      if (quizId) {
        await quizAPI.updateQuiz(quizId, quizData);
        alert('Quiz updated successfully!');
      } else {
        const newQuiz = await quizAPI.createQuiz(quizData);
        alert('Quiz created successfully!');
        navigate(`/teacher/courses/${courseId}/quiz/${newQuiz._id}`);
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Failed to save quiz');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate(`/teacher/courses/${courseId}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Course
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {quizId ? 'Edit Quiz' : 'Create Quiz'}
          </h1>
          <p className="text-gray-600">Course: {course?.title}</p>
        </div>

        {/* Quiz Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quiz Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Quiz Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the quiz"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  value={settings.timeLimit}
                  onChange={(e) => setSettings({...settings, timeLimit: parseInt(e.target.value)})}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  value={settings.passingScore}
                  onChange={(e) => setSettings({...settings, passingScore: parseInt(e.target.value)})}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Attempts (0 = unlimited)
                </label>
                <input
                  type="number"
                  value={settings.maxAttempts}
                  onChange={(e) => setSettings({...settings, maxAttempts: parseInt(e.target.value)})}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.showAnswers}
                  onChange={(e) => setSettings({...settings, showAnswers: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Show correct answers after submission</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.shuffleQuestions}
                  onChange={(e) => setSettings({...settings, shuffleQuestions: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Shuffle questions</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.shuffleOptions}
                  onChange={(e) => setSettings({...settings, shuffleOptions: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Shuffle options (MCQ)</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.allowReview}
                  onChange={(e) => setSettings({...settings, allowReview: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Allow review after quiz</span>
              </label>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Questions ({questions.length})
            </h2>
            
            <div className="flex gap-2">
              <button
                onClick={() => addQuestion('mcq')}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                + MCQ
              </button>
              <button
                onClick={() => addQuestion('fill_blank')}
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                + Fill Blank
              </button>
              <button
                onClick={() => addQuestion('true_false')}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
              >
                + True/False
              </button>
            </div>
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">No questions added yet</p>
              <p className="text-sm">Click the buttons above to add questions</p>
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <QuestionBuilder
                  key={question.id}
                  question={question}
                  index={index}
                  onUpdate={updateQuestion}
                  onUpdateData={updateQuestionData}
                  onDelete={() => deleteQuestion(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save as Draft'}</span>
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            <Eye className="w-5 h-5" />
            <span>{saving ? 'Publishing...' : 'Save & Publish'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Question Builder Component
const QuestionBuilder = ({ question, index, onUpdate, onUpdateData, onDelete }) => {
  const renderQuestionEditor = () => {
    switch (question.type) {
      case 'mcq':
        return <MCQEditor question={question} index={index} onUpdate={onUpdateData} />;
      case 'fill_blank':
        return <FillBlankEditor question={question} index={index} onUpdate={onUpdateData} />;
      case 'true_false':
        return <TrueFalseEditor question={question} index={index} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-semibold">
              Question {index + 1}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {question.type.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <input
            type="text"
            value={question.question}
            onChange={(e) => onUpdate(index, 'question', e.target.value)}
            placeholder="Enter your question"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-medium"
          />
        </div>

        <div className="ml-4 flex items-center space-x-2">
          <input
            type="number"
            value={question.points}
            onChange={(e) => onUpdate(index, 'points', parseInt(e.target.value) || 1)}
            min="1"
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
          />
          <span className="text-sm text-gray-600">pts</span>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {renderQuestionEditor()}

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Explanation (optional)
        </label>
        <textarea
          value={question.explanation}
          onChange={(e) => onUpdate(index, 'explanation', e.target.value)}
          placeholder="Explain the correct answer..."
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );
};

// MCQ Editor
const MCQEditor = ({ question, index, onUpdate }) => {
  const updateOption = (optIndex, value) => {
    const newOptions = [...question.options];
    newOptions[optIndex] = value;
    onUpdate(index, 'options', newOptions);
  };

  const addOption = () => {
    onUpdate(index, 'options', [...question.options, '']);
  };

  const removeOption = (optIndex) => {
    if (question.options.length <= 2) {
      alert('Must have at least 2 options');
      return;
    }
    const newOptions = question.options.filter((_, i) => i !== optIndex);
    onUpdate(index, 'options', newOptions);
    if (question.correctAnswer >= newOptions.length) {
      onUpdate(index, 'correctAnswer', 0);
    }
  };

  return (
    <div className="space-y-3">
      {question.options.map((option, optIndex) => (
        <div key={optIndex} className="flex items-center space-x-2">
          <input
            type="radio"
            checked={question.correctAnswer === optIndex}
            onChange={() => onUpdate(index, 'correctAnswer', optIndex)}
            className="text-primary-600"
          />
          <input
            type="text"
            value={option}
            onChange={(e) => updateOption(optIndex, e.target.value)}
            placeholder={`Option ${optIndex + 1}`}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          {question.options.length > 2 && (
            <button
              onClick={() => removeOption(optIndex)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addOption}
        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        + Add Option
      </button>
    </div>
  );
};

// Fill Blank Editor
const FillBlankEditor = ({ question, index, onUpdate }) => {
  const updateBlank = (blankIndex, value) => {
    const newBlanks = [...question.blanks];
    newBlanks[blankIndex] = value;
    onUpdate(index, 'blanks', newBlanks);
  };

  const addBlank = () => {
    onUpdate(index, 'blanks', [...question.blanks, '']);
  };

  const removeBlank = (blankIndex) => {
    if (question.blanks.length <= 1) {
      alert('Must have at least 1 blank');
      return;
    }
    onUpdate(index, 'blanks', question.blanks.filter((_, i) => i !== blankIndex));
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={question.caseSensitive}
          onChange={(e) => onUpdate(index, 'caseSensitive', e.target.checked)}
          className="rounded"
        />
        <span className="text-sm text-gray-700">Case sensitive</span>
      </label>

      {question.blanks.map((blank, blankIndex) => (
        <div key={blankIndex} className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 w-16">Blank {blankIndex + 1}:</span>
          <input
            type="text"
            value={blank}
            onChange={(e) => updateBlank(blankIndex, e.target.value)}
            placeholder="Correct answer"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          {question.blanks.length > 1 && (
            <button
              onClick={() => removeBlank(blankIndex)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addBlank}
        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        + Add Blank
      </button>
    </div>
  );
};

// True/False Editor
const TrueFalseEditor = ({ question, index, onUpdate }) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          checked={question.isTrue === true}
          onChange={() => onUpdate(index, 'isTrue', true)}
          className="text-primary-600"
        />
        <span className="text-gray-700">True</span>
      </label>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          checked={question.isTrue === false}
          onChange={() => onUpdate(index, 'isTrue', false)}
          className="text-primary-600"
        />
        <span className="text-gray-700">False</span>
      </label>
    </div>
  );
};

export default QuizBuilder;