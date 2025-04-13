
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useAuth } from '@/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<'doctor' | 'patient'>('patient');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !firstName || !lastName) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error } = await signUp(email, password, firstName, lastName, role);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
        return;
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now login.",
      });
      
      navigate('/');
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration error",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Activity className="h-12 w-12 text-medical" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MediCare</h1>
          <p className="text-gray-500">Create your account</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create an account to access MediCare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <div className="mb-6">
                <Tabs defaultValue="patient" className="w-full" onValueChange={(value) => setRole(value as any)}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="patient">Patient</TabsTrigger>
                    <TabsTrigger value="doctor">Medical Staff</TabsTrigger>
                  </TabsList>
                </Tabs>
                <p className="text-xs text-gray-500 mt-2">
                  {role === 'doctor' ? 
                    'Staff accounts require approval from administration.' : 
                    'Patient accounts are activated immediately.'}
                </p>
              </div>
              
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@example.com" 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Password must be at least 6 characters
                  </p>
                </div>
              </div>
              
              <Button className="w-full mt-6" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/" className="text-medical hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
