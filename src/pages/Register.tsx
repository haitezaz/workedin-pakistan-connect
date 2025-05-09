
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('worker');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Register with auth context
      await register({ name, email, phone, cnic, role }, password);
      
      // Prepare phone and CNIC as numbers or null
      let phoneNumber = null;
      let cnicNumber = null;
      
      try {
        if (phone) {
          // Remove all non-numeric characters and parse as integer
          const cleanPhone = phone.replace(/\D/g, '');
          if (cleanPhone) phoneNumber = parseInt(cleanPhone, 10);
        }
      } catch (err) {
        console.error('Unable to parse phone number', err);
      }
      
      try {
        if (cnic) {
          // Remove all non-numeric characters and parse as integer
          const cleanCnic = cnic.replace(/\D/g, '');
          if (cleanCnic) cnicNumber = parseInt(cleanCnic, 10);
        }
      } catch (err) {
        console.error('Unable to parse CNIC', err);
      }
      
      console.log('Creating record with data:', { 
        name, email, phoneNumber, cnicNumber, role 
      });
      
      // Create record in the appropriate table based on role
      if (role === 'worker') {
        const { data: workerData, error: workerError } = await supabase
          .from('worker')
          .insert([
            { 
              name, 
              email,
              phonenumber: phoneNumber,
              cnic: cnicNumber,
              availabilitystatus: 'active',
              hourlyrate: 0
            }
          ])
          .select();
          
        if (workerError) {
          console.error('Error creating worker record:', workerError);
          toast.error('Registration successful but there was an issue setting up your worker profile. Please update your profile.');
        } else {
          console.log('Worker data saved successfully:', workerData);
          toast.success('Worker profile created successfully!');
        }
        
        navigate('/worker/profile');
      } else if (role === 'employer') {
        const { data: employerData, error: employerError } = await supabase
          .from('employer')
          .insert([
            { 
              name, 
              email,
              phonenumber: phoneNumber,
              cnic: cnicNumber
            }
          ])
          .select();
          
        if (employerError) {
          console.error('Error creating employer record:', employerError);
          toast.error('Registration successful but there was an issue setting up your employer profile. Please update your profile.');
        } else {
          console.log('Employer data saved successfully:', employerData);
          toast.success('Employer profile created successfully!');
        }
        
        navigate('/employer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom my-10 max-w-md">
        <Card className="card-shadow">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="e.g., 03001234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC</Label>
                <Input
                  id="cnic"
                  placeholder="e.g., 12345-1234567-1"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
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
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>I am registering as a:</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="worker" id="worker" />
                    <Label htmlFor="worker" className="cursor-pointer">Worker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="employer" />
                    <Label htmlFor="employer" className="cursor-pointer">Employer</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              
              <Button 
                type="submit" 
                className="w-full bg-workedIn-blue hover:bg-workedIn-blue/90"
                disabled={isLoading || isSubmitting}
              >
                {isLoading || isSubmitting ? 'Processing...' : 'Register'}
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-gray-500">Already have an account?</span>{' '}
                <Button variant="link" onClick={() => navigate('/login')} className="p-0 h-auto font-normal text-workedIn-blue">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Register;
