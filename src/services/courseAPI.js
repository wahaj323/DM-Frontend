import api from './api';

export const courseAPI = {
  // Get all courses
  getAllCourses: async (params = {}) => {
    const { level, category, search, published } = params;
    const queryParams = new URLSearchParams();
    
    if (level) queryParams.append('level', level);
    if (category) queryParams.append('category', category);
    if (search) queryParams.append('search', search);
    if (published !== undefined) queryParams.append('published', published);
    
    const response = await api.get(`/courses?${queryParams.toString()}`);
    return response.data;
  },

  // Get teacher's courses
  getMyCourses: async () => {
    const response = await api.get('/courses/my-courses');
    return response.data;
  },

  // Get single course
  getCourse: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  // Create course
  createCourse: async (data) => {
    const response = await api.post('/courses', data);
    return response.data;
  },

  // Update course
  updateCourse: async (id, data) => {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
  },

  // Delete course
  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },

  // Publish/Unpublish course
  togglePublish: async (id) => {
    const response = await api.put(`/courses/${id}/publish`);
    return response.data;
  },

  // Enroll student
  enrollStudent: async (courseId, studentId) => {
    const response = await api.post(`/courses/${courseId}/enroll/${studentId}`);
    return response.data;
  },

  // Unenroll student
  unenrollStudent: async (courseId, studentId) => {
    const response = await api.delete(`/courses/${courseId}/unenroll/${studentId}`);
    return response.data;
  },

  // Module operations
  createModule: async (data) => {
    const response = await api.post('/modules', data);
    return response.data;
  },

  getModule: async (id) => {
    const response = await api.get(`/modules/${id}`);
    return response.data;
  },

  updateModule: async (id, data) => {
    const response = await api.put(`/modules/${id}`, data);
    return response.data;
  },

  deleteModule: async (id) => {
    const response = await api.delete(`/modules/${id}`);
    return response.data;
  },

  reorderModules: async (id, newOrder) => {
    const response = await api.put(`/modules/${id}/reorder`, { newOrder });
    return response.data;
  },

  // Lesson operations
  createLesson: async (moduleId, data) => {
    const response = await api.post(`/modules/${moduleId}/lessons`, data);
    return response.data;
  },

  getLesson: async (id) => {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },

  updateLesson: async (id, data) => {
    const response = await api.put(`/lessons/${id}`, data);
    return response.data;
  },

  deleteLesson: async (id) => {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  },

  reorderLessons: async (id, newOrder) => {
    const response = await api.put(`/lessons/${id}/reorder`, { newOrder });
    return response.data;
  },
};