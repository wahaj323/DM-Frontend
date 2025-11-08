import { CheckCircle, XCircle } from 'lucide-react';

const MCQQuestion = ({ 
  question, 
  questionNumber, 
  selectedAnswer, 
  onAnswerChange, 
  showResult = false,
  isReview = false 
}) => {
  const handleOptionClick = (index) => {
    if (!isReview) {
      onAnswerChange(index);
    }
  };

  const getOptionClassName = (index) => {
    const baseClasses = "w-full text-left p-4 border-2 rounded-lg transition cursor-pointer";
    
    if (isReview) {
      // Show correct/incorrect in review mode
      if (index === question.correctAnswer) {
        return `${baseClasses} bg-green-50 border-green-500`;
      }
      if (index === selectedAnswer && index !== question.correctAnswer) {
        return `${baseClasses} bg-red-50 border-red-500`;
      }
      return `${baseClasses} border-gray-300 opacity-50`;
    }
    
    if (selectedAnswer === index) {
      return `${baseClasses} bg-primary-50 border-primary-600`;
    }
    
    return `${baseClasses} border-gray-300 hover:border-primary-400 hover:bg-gray-50`;
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
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={isReview}
            className={getOptionClassName(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedAnswer === index 
                    ? 'bg-primary-600 border-primary-600' 
                    : 'border-gray-400'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>

              {isReview && (
                <div className="ml-3">
                  {index === question.correctAnswer && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                  {index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Show explanation in review mode */}
      {isReview && question.explanation && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}

      {/* Show result indicator */}
      {showResult && !isReview && (
        <div className={`mt-4 p-3 rounded-lg ${
          selectedAnswer === question.correctAnswer 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`text-sm font-semibold ${
            selectedAnswer === question.correctAnswer 
              ? 'text-green-900' 
              : 'text-red-900'
          }`}>
            {selectedAnswer === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MCQQuestion;