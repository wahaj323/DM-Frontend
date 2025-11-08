const ProgressBar = ({ percentage, height = 'h-4', showLabel = true, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-600',
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600'
  };

  const bgColor = colorClasses[color] || colorClasses.primary;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${bgColor} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent to-white opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;