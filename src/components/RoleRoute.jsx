import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const RoleRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = user?.role === 'teacher' 
      ? '/teacher/dashboard' 
      : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default RoleRoute;