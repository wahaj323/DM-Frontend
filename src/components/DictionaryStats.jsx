import { BookOpen, TrendingUp, Award, Target } from 'lucide-react';

const DictionaryStats = ({ stats }) => {
  const progressPercentage = stats.totalWords > 0 
    ? Math.round((stats.mastered / stats.totalWords) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Words */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Words</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalWords}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Learning */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Learning</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.learning}</p>
            <p className="text-xs text-gray-500 mt-1">+ {stats.newWords} new</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <TrendingUp className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Mastered */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Mastered</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.mastered}</p>
            <p className="text-xs text-gray-500 mt-1">{progressPercentage}% complete</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <Award className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Practice Sessions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Practice</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalPracticed}</p>
            <p className="text-xs text-gray-500 mt-1">Sessions</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="lg:col-span-4 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-medium text-gray-900">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>{stats.newWords} New</span>
          <span>{stats.learning} Learning</span>
          <span>{stats.mastered} Mastered</span>
        </div>
      </div>
    </div>
  );
};

export default DictionaryStats;