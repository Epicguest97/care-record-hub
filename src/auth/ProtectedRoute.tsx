
import { Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Spinner } from '@/components/ui/spinner';

type UserRole = 'admin' | 'doctor' | 'patient';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { loading, profile } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Spinner className="h-12 w-12 text-medical" />
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Always render the content with the user's role or a default role
  const userRole = profile?.role || 'patient';
  
  return (
    <MainLayout userRole={userRole}>
      <Outlet />
    </MainLayout>
  );
};
