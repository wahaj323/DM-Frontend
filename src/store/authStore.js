import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api'; // Make sure to import your API instance

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
      
      updateUser: (userData) => set((state) => ({ 
        user: { ...state.user, ...userData } 
      })),
      
      // ADD THIS METHOD - Refresh user data from server
      refreshUser: async () => {
        try {
          const response = await api.get('/api/auth/me');
          const updatedUser = response.data;
          
          set({ 
            user: updatedUser 
          });
          
          console.log('🔄 User data refreshed:', updatedUser);
          return updatedUser;
        } catch (error) {
          console.error('❌ Error refreshing user data:', error);
          // If refresh fails, log user out
          if (error.response?.status === 401) {
            get().logout();
          }
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;