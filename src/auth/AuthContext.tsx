import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

type UserRole = 'admin' | 'doctor' | 'patient';

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: UserRole;
};

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Defer Supabase calls with setTimeout
          setTimeout(async () => {
            await fetchProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data as Profile);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Hardcoded admin credentials check
    if (email === 'admin' && password === 'admin123') {
      // Create a mock session and user for the hardcoded admin
      const mockUser = {
        id: 'hardcoded-admin-id',
        email: 'admin@medicare.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString()
      };
      
      const mockSession = {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'bearer',
        user: mockUser
      } as unknown as Session;
      
      // Set the mock user and session
      setUser(mockUser as User);
      setSession(mockSession);
      
      // Set a hardcoded admin profile
      const adminProfile: Profile = {
        id: 'hardcoded-admin-id',
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin'
      };
      
      setProfile(adminProfile);
      setLoading(false);
      
      // Return success response with mock data
      return { data: mockSession, error: null };
    }
    
    // Regular Supabase authentication for other users
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    return { data: data.session, error };
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string
  ) => {
    setLoading(true);
  
    const validRoles: UserRole[] = ['admin', 'doctor', 'patient'];
    const formattedRole = role.toLowerCase();
  
    if (!validRoles.includes(formattedRole as UserRole)) {
      setLoading(false);
      return {
        data: null,
        error: new Error(`Invalid role: "${role}". Must be one of: ${validRoles.join(', ')}`),
      };
    }
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: formattedRole,
        },
      },
    });
  
    setLoading(false);
    return { data, error };
  };
  

  const signOut = async () => {
    // Check if this is our hardcoded admin
    if (user?.id === 'hardcoded-admin-id') {
      // Just clear the local state
      setUser(null);
      setSession(null);
      setProfile(null);
      navigate('/');
      return;
    }
    
    // Otherwise use the normal Supabase signOut
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      session,
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
