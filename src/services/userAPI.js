import api from './api';

export const userAPI = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  // Upload profile image
  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    const response = await api.post('/users/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user activity
  getActivity: async (page = 1, limit = 20) => {
    const response = await api.get(`/users/activity?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get user stats
  getStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },
};