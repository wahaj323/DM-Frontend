import api from './api';

export const attemptAPI = {
  // Submit quiz attempt
  submitAttempt: async (quizId, attemptData) => {
    const response = await api.post(`/attempts/submit/${quizId}`, attemptData);
    return response.data;
  },

  // Get student's attempts for a quiz
  getQuizAttempts: async (quizId) => {
    const response = await api.get(`/attempts/quiz/${quizId}`);
    return response.data;
  },

  // Get single attempt details
  getAttempt: async (attemptId) => {
    const response = await api.get(`/attempts/${attemptId}`);
    return response.data;
  },

  // Get student's attempt history
  getHistory: async () => {
    const response = await api.get('/attempts/student/history');
    return response.data;
  },

  // Get all attempts for a course (Teacher)
  getCourseAttempts: async (courseId) => {
    const response = await api.get(`/attempts/course/${courseId}`);
    return response.data;
  },

  // Add teacher feedback
  addFeedback: async (attemptId, feedback) => {
    const response = await api.put(`/attempts/${attemptId}/feedback`, { feedback });
    return response.data;
  },

  // Get student quiz stats (Teacher)
  getStudentStats: async (studentId) => {
    const response = await api.get(`/attempts/student/${studentId}/stats`);
    return response.data;
  },
};

export default attemptAPI;