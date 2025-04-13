
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'admin' | 'doctor' | 'patient';

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: UserRole;
};

interface AuthContextType {
  user: { id: string } | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<{ error: Error | null }>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate sign in - always succeeds
    const role = email.includes('admin') ? 'admin' : 
                 email.includes('doctor') ? 'doctor' : 'patient';
    
    const mockUser = { id: `mock-${role}-id` };
    
    const mockProfile = {
      id: mockUser.id,
      first_name: role === 'admin' ? 'Admin' : role === 'doctor' ? 'Doctor' : 'Patient',
      last_name: 'User',
      role: role as UserRole
    };
    
    setUser(mockUser);
    setProfile(mockProfile);
    setLoading(false);
    
    // Redirect based on role
    navigate(`/${role}/dashboard`);
    
    return { error: null };
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ) => {
    setLoading(true);
    
    const mockUser = { id: `mock-${role}-id` };
    
    const mockProfile = {
      id: mockUser.id,
      first_name: firstName,
      last_name: lastName,
      role: role as UserRole
    };
    
    setUser(mockUser);
    setProfile(mockProfile);
    setLoading(false);
    
    // Redirect to login page after signup
    navigate('/');
    
    return { error: null };
  };

  const signOut = () => {
    setUser(null);
    setProfile(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      signIn,
      signUp,
      signOut,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
