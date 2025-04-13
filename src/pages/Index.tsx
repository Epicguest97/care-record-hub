
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    // If still loading, don't redirect
    if (loading) return;

    // If no user, redirect to login
    if (!user) {
      navigate('/');
      return;
    }

    // If user is logged in but profile is not loaded yet, wait
    if (!profile) return;

    // Redirect based on user role
    navigate(`/${profile.role}/dashboard`);
  }, [navigate, user, profile, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <p className="text-gray-600">Redirecting to MediCare system</p>
      </div>
    </div>
  );
};

export default Index;
