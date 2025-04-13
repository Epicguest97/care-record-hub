
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Spinner } from '@/components/ui/spinner';

type UserRole = 'admin' | 'doctor' | 'patient';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

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

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If role checking is needed and profile doesn't exist yet
  if (allowedRoles && !profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Spinner className="h-12 w-12 text-medical" />
          <p className="mt-4 text-gray-500">Loading profile data...</p>
        </div>
      </div>
    );
  }

  // If role is required but user doesn't have the right role
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to={`/${profile.role}/dashboard`} replace />;
  }

  // User is authenticated and authorized
  return (
    <MainLayout userRole={profile?.role || 'patient'}>
      <Outlet />
    </MainLayout>
  );
};
