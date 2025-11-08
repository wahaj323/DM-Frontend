import { Award, Calendar, CheckCircle } from 'lucide-react';

const CertificateTemplate = ({ certificate, student, course, teacher }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white p-12 border-8 border-double border-primary-600 relative">
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-primary-300"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-primary-300"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-primary-300"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-primary-300"></div>

      {/* Content */}
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 rounded-full">
            <Award className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
          Certificate of Completion
        </h1>

        <div className="w-32 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8"></div>

        {/* Body Text */}
        <p className="text-xl text-gray-700 mb-4">This is to certify that</p>

        <h2 className="text-4xl font-serif font-bold text-primary-600 mb-6">
          {student?.name || certificate.studentId?.name}
        </h2>

        <p className="text-xl text-gray-700 mb-4">has successfully completed the course</p>

        <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">
          {course?.title || certificate.courseId?.title}
        </h3>

        <p className="text-lg text-gray-600 mb-8">
          Level: <span className="font-semibold">{course?.level || certificate.courseId?.level}</span>
        </p>

        {/* Course Details */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Lessons</p>
            <p className="font-semibold text-gray-900">{certificate.totalLessons}</p>
          </div>

          <div className="text-center">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Study Time</p>
            <p className="font-semibold text-gray-900">{certificate.totalTimeSpent}h</p>
          </div>
        </div>

        <div className="w-32 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mb-8"></div>

        {/* Date and Signatures */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-left">
            <p className="text-sm text-gray-600 mb-2">Date of Completion</p>
            <p className="font-semibold text-gray-900">
              {formatDate(certificate.completionDate)}
            </p>
          </div>

          <div className="text-center">
            <div className="w-48 border-t-2 border-gray-400 pt-2">
              <p className="font-semibold text-gray-900">{teacher?.name || certificate.teacherName}</p>
              <p className="text-sm text-gray-600">Instructor</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">Certificate No.</p>
            <p className="font-mono font-semibold text-gray-900 text-sm">
              {certificate.certificateNumber}
            </p>
          </div>
        </div>

        {/* Platform Name */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-2xl font-bold text-gray-900">
            Deutsch<span className="text-primary-600">Meister</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">Online German Learning Platform</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;