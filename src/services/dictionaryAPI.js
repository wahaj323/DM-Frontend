import api from './api';

export const dictionaryAPI = {
  // Get dictionary
  getDictionary: async (params = {}) => {
    const { search, status, page, limit, sortBy, order } = params;
    const queryParams = new URLSearchParams();
    
    if (search) queryParams.append('search', search);
    if (status) queryParams.append('status', status);
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    if (sortBy) queryParams.append('sortBy', sortBy);
    if (order) queryParams.append('order', order);
    
    const response = await api.get(`/dictionary?${queryParams.toString()}`);
    return response.data;
  },

  // Get statistics
  getStats: async () => {
    const response = await api.get('/dictionary/stats');
    return response.data;
  },

  // Add word manually
  addWord: async (data) => {
    const response = await api.post('/dictionary/add', data);
    return response.data;
  },

  // Update entry
  updateEntry: async (id, data) => {
    const response = await api.put(`/dictionary/${id}`, data);
    return response.data;
  },

  // Delete entry
  deleteEntry: async (id) => {
    const response = await api.delete(`/dictionary/${id}`);
    return response.data;
  },

  // Record practice
  recordPractice: async (id, correct) => {
    const response = await api.post(`/dictionary/${id}/practice`, { correct });
    return response.data;
  },

  // Add from lesson
  addFromLesson: async (lessonId) => {
    const response = await api.post(`/dictionary/add-from-lesson/${lessonId}`);
    return response.data;
  },
};