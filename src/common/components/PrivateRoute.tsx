import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/modules/Auth/hooks/use-auth';

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};