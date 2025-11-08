import { CheckCircle, XCircle } from 'lucide-react';

const FillBlankQuestion = ({ 
  question, 
  questionNumber, 
  answers = [], 
  onAnswerChange, 
  isReview = false 
}) => {
  const handleInputChange = (index, value) => {
    if (!isReview) {
      const newAnswers = [...answers];
      newAnswers[index] = value;
      onAnswerChange(newAnswers);
    }
  };

  const isCorrect = (index) => {
    if (!isReview || !answers[index]) return null;
    
    const studentAnswer = question.caseSensitive 
      ? answers[index].trim() 
      : answers[index].trim().toLowerCase();
    
    const correctAnswer = question.caseSensitive 
      ? question.blanks[index].trim() 
      : question.blanks[index].trim().toLowerCase();
    
    return studentAnswer === correctAnswer;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <span className="text-sm font-semibold text-primary-600">
          Question {questionNumber}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 mt-2">
          {question.question}
        </h3>
        {question.points > 0 && (
          <span className="text-sm text-gray-600 mt-1">
            ({question.points} {question.points === 1 ? 'point' : 'points'})
          </span>
        )}
        {question.caseSensitive && (
          <p className="text-sm text-orange-600 mt-2">
            ⚠️ Case sensitive
          </p>
        )}
      </div>

      <div className="space-y-4">
        {question.blanks.map((blank, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blank {index + 1}:
            </label>
            <div className="relative">
              <input
                type="text"
                value={answers[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
                disabled={isReview}
                placeholder="Type your answer here..."
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                  isReview
                    ? isCorrect(index)
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-primary-500'
                }`}
              />
              
              {isReview && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isCorrect(index) ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>
              )}
            </div>

            {/* Show correct answer in review mode if wrong */}
            {isReview && !isCorrect(index) && (
              <p className="text-sm text-green-700 mt-1">
                Correct answer: <span className="font-semibold">{blank}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Explanation */}
      {isReview && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default FillBlankQuestion;