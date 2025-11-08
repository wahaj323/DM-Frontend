import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { certificateAPI } from '../services/certificateAPI';
import { courseAPI } from '../services/courseAPI';
import CertificateTemplate from '../components/CertificateTemplate';
import { Download, Share2, Award, Loader } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Certificate = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const certificateRef = useRef();

  const [certificate, setCertificate] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCertificate();
  }, [courseId]);

  const fetchCertificate = async () => {
    try {
      setLoading(true);
      
      // Fetch course details
      const courseData = await courseAPI.getCourseById(courseId);
      setCourse(courseData);

      // Try to fetch existing certificate
      try {
        const certificates = await certificateAPI.getAllCertificates();
        const existingCert = certificates.find(c => c.courseId._id === courseId);
        
        if (existingCert) {
          setCertificate(existingCert);
        }
      } catch (err) {
        // No certificate found yet, this is okay
        console.log('No certificate found yet');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load certificate');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCertificate = async () => {
    try {
      setGenerating(true);
      setError('');
      
      const newCertificate = await certificateAPI.generateCertificate(courseId);
      setCertificate(newCertificate);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate certificate');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    // In a real implementation, you would use html2canvas or similar library
    // to convert the certificate to an image/PDF
    alert('Download functionality would be implemented here using html2canvas or jsPDF');
  };

  const handleShare = () => {
    if (navigator.share && certificate) {
      navigator.share({
        title: 'My Course Certificate',
        text: `I just completed ${course.title}!`,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Certificate link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error && !certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-800 mb-4">{error}</p>
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="text-primary-600 hover:text-primary-700 mb-4"
          >
            ← Back to Course
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">Course Certificate</h1>
          <p className="text-gray-600 mt-2">
            {course?.title}
          </p>
        </div>

        {!certificate ? (
          /* Generate Certificate Section */
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-primary-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Generate Your Certificate
              </h2>
              
              <p className="text-gray-600 mb-8">
                Congratulations on completing the course! Click the button below to generate 
                your official certificate of completion.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleGenerateCertificate}
                disabled={generating}
                className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                {generating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5" />
                    <span>Generate Certificate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Certificate Display Section */
          <>
            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Certificate</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share Certificate</span>
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Certificate Number: <span className="font-mono font-semibold">{certificate.certificateNumber}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Issued: {new Date(certificate.issuedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Certificate Display */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div ref={certificateRef} className="p-8">
                <CertificateTemplate
                  certificate={certificate}
                  student={user}
                  course={course}
                  teacher={{
                    name: certificate.teacherName,
                    _id: certificate.teacherId
                  }}
                />
              </div>
            </div>

            {/* Verification Info */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Certificate Verification</h3>
              <p className="text-sm text-gray-600 mb-4">
                Anyone can verify the authenticity of this certificate using the certificate number above.
              </p>
              <button
                onClick={() => navigate(`/certificates/verify/${certificate.certificateNumber}`)}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Verify this certificate →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Certificate;