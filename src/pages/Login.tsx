
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import Layout from '@/components/layout/Layout';
import { toast } from "@/components/ui/sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('worker');
  const [error, setError] = useState('');

  // If already authenticated, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User is authenticated, redirecting to appropriate dashboard", user);
      if (user.role === 'worker') {
        navigate('/worker/jobs');
      } else if (user.role === 'employer') {
        navigate('/employer/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    try {
      toast.loading("Logging in...", { id: "login" });
      await login(email, password, role);
      toast.dismiss("login");
      
      // Redirect will be handled by the useEffect above
      console.log("Login successful, user should be redirected by useEffect");
    } catch (err: any) {
      toast.dismiss("login");
      toast.error(err.message || 'Invalid credentials. Please try again.');
      setError(err.message || 'Invalid credentials. Please try again.');
    }
  };

  // Helper function to provide test credentials
  const fillTestCredentials = () => {
    if (role === 'worker') {
      setEmail('worker@test.com');
      setPassword('password');
    } else if (role === 'employer') {
      setEmail('employer@test.com');
      setPassword('password');
    } else if (role === 'admin') {
      setEmail('admin@test.com');
      setPassword('password');
    }
  };

  return (
    <Layout>
      <div className="container-custom my-10 max-w-md">
        <Card className="card-shadow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="worker" id="worker" />
                    <Label htmlFor="worker" className="cursor-pointer">Worker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="employer" />
                    <Label htmlFor="employer" className="cursor-pointer">Employer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              
              <Button 
                type="submit" 
                className="w-full bg-workedIn-blue hover:bg-workedIn-blue/90"
                disabled={isLoading}
              >
                {isLoading ? 'Logging In...' : 'Login'}
              </Button>
              
              <div className="text-center text-sm mt-2">
                <Button 
                  variant="link" 
                  type="button" 
                  onClick={fillTestCredentials}
                  className="p-0 h-auto font-normal text-workedIn-blue"
                >
                  Use test account
                </Button>
              </div>
              
              <div className="text-center text-sm">
                <span className="text-gray-500">Don't have an account?</span>{' '}
                <Button variant="link" onClick={() => navigate('/register')} className="p-0 h-auto font-normal text-workedIn-blue">
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
