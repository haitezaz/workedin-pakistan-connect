
import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, UserProfile, UserRole } from '@/types/auth';
import { toast } from "@/components/ui/sonner";
import { supabase } from '@/integrations/supabase/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('workedIn_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('workedIn_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      console.log("Logging in with:", { email, role });
      
      // First check if user exists in the relevant table based on role
      let userData: UserProfile | null = null;
      let foundUser = false;
      
      if (role === 'worker') {
        const { data: worker, error } = await supabase
          .from('worker')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        
        console.log("Worker query result:", { worker, error });
        
        if (worker) {
          foundUser = true;
          userData = {
            id: worker.workerid.toString(),
            email: worker.email || '',
            name: worker.name || '',
            phone: worker.phonenumber ? worker.phonenumber.toString() : '',
            cnic: worker.cnic ? worker.cnic.toString() : '',
            role: 'worker'
          };
        }
      } else if (role === 'employer') {
        const { data: employer, error } = await supabase
          .from('employer')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        
        console.log("Employer query result:", { employer, error });
        
        if (employer) {
          foundUser = true;
          userData = {
            id: employer.empid.toString(),
            email: employer.email || '',
            name: employer.name || '',
            phone: employer.phonenumber ? employer.phonenumber.toString() : '',
            cnic: employer.cnic ? employer.cnic.toString() : '',
            role: 'employer'
          };
        }
      } else if (role === 'admin') {
        const { data: admin, error } = await supabase
          .from('admin')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        
        console.log("Admin query result:", { admin, error });
        
        if (admin) {
          foundUser = true;
          userData = {
            id: admin.adminid.toString(),
            email: admin.email || '',
            name: admin.name || '',
            phone: admin.phonenumber ? admin.phonenumber.toString() : '',
            cnic: admin.cnic ? admin.cnic.toString() : '',
            role: 'admin'
          };
        }
      }

      // For test/demo accounts, check the hardcoded credentials
      if (!foundUser) {
        if (email === 'worker@test.com' && password === 'password' && role === 'worker') {
          userData = {
            id: 'test-worker-1',
            email: 'worker@test.com',
            name: 'Test Worker',
            phone: '03001234567',
            cnic: '12345-1234567-1',
            role: 'worker'
          };
          foundUser = true;
        } else if (email === 'employer@test.com' && password === 'password' && role === 'employer') {
          userData = {
            id: 'test-employer-1',
            email: 'employer@test.com',
            name: 'Test Employer',
            phone: '03007654321',
            cnic: '12345-7654321-1',
            role: 'employer'
          };
          foundUser = true;
        } else if (email === 'admin@test.com' && password === 'password' && role === 'admin') {
          userData = {
            id: 'test-admin-1',
            email: 'admin@test.com',
            name: 'Admin User',
            phone: '03009876543',
            cnic: '12345-9876543-1',
            role: 'admin'
          };
          foundUser = true;
        }
      }
      
      if (!foundUser) {
        console.error("User not found with given email and role");
        throw new Error("Invalid credentials");
      }
      
      if (!userData) {
        console.error("User data is null");
        throw new Error("Invalid credentials");
      }

      // If we found the user, compare passwords
      // Note: In a real app, you would use proper password hashing
      // This is a simplified implementation for demo purposes
      if (role === 'worker') {
        const { data: worker } = await supabase
          .from('worker')
          .select('password')
          .eq('email', email)
          .maybeSingle();
        
        // For demo/test accounts, accept 'password' as the password
        const isTestAccount = email === 'worker@test.com' && password === 'password';
        
        if (!isTestAccount && (!worker || worker.password !== password)) {
          console.error("Password doesn't match");
          throw new Error("Invalid credentials");
        }
      } else if (role === 'employer') {
        const { data: employer } = await supabase
          .from('employer')
          .select('password')
          .eq('email', email)
          .maybeSingle();
        
        // For demo/test accounts, accept 'password' as the password
        const isTestAccount = email === 'employer@test.com' && password === 'password';
        
        if (!isTestAccount && (!employer || employer.password !== password)) {
          console.error("Password doesn't match");
          throw new Error("Invalid credentials");
        }
      } else if (role === 'admin') {
        const { data: admin } = await supabase
          .from('admin')
          .select('password')
          .eq('email', email)
          .maybeSingle();
        
        // For demo/test accounts, accept 'password' as the password
        const isTestAccount = email === 'admin@test.com' && password === 'password';
        
        if (!isTestAccount && (!admin || admin.password !== password)) {
          console.error("Password doesn't match");
          throw new Error("Invalid credentials");
        }
      }
      
      // Set user data and save to localStorage
      setUser(userData);
      localStorage.setItem('workedIn_user', JSON.stringify(userData));
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (userData: Partial<UserProfile>, password: string) => {
    setIsLoading(true);
    try {
      console.log("Registering user:", userData);
      
      if (!userData.email || !userData.name || !userData.phone || !userData.cnic || !userData.role || !password) {
        throw new Error('All fields are required');
      }
      
      // Check if user already exists
      let userExists = false;
      
      if (userData.role === 'worker') {
        const { data: worker } = await supabase
          .from('worker')
          .select('email')
          .eq('email', userData.email)
          .maybeSingle();
        userExists = !!worker;
      } else if (userData.role === 'employer') {
        const { data: employer } = await supabase
          .from('employer')
          .select('email')
          .eq('email', userData.email)
          .maybeSingle();
        userExists = !!employer;
      }
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user based on role
      let userId: number | string;
      
      if (userData.role === 'worker') {
        const phoneNumber = userData.phone ? parseInt(userData.phone.replace(/\D/g, ''), 10) : null;
        const cnicNumber = userData.cnic ? parseInt(userData.cnic.replace(/\D/g, ''), 10) : null;
        
        const { data: newWorker, error } = await supabase
          .from('worker')
          .insert([
            { 
              name: userData.name, 
              email: userData.email,
              phonenumber: phoneNumber,
              cnic: cnicNumber,
              password: password,
              availabilitystatus: 'active',
              hourlyrate: 0
            }
          ])
          .select();
        
        if (error) {
          console.error("Error creating worker:", error);
          throw new Error(error.message);
        }
        
        if (!newWorker || newWorker.length === 0) {
          throw new Error('Failed to create worker account');
        }
        
        userId = newWorker[0].workerid;
      } else if (userData.role === 'employer') {
        const phoneNumber = userData.phone ? parseInt(userData.phone.replace(/\D/g, ''), 10) : null;
        const cnicNumber = userData.cnic ? parseInt(userData.cnic.replace(/\D/g, ''), 10) : null;
        
        const { data: newEmployer, error } = await supabase
          .from('employer')
          .insert([
            { 
              name: userData.name, 
              email: userData.email,
              phonenumber: phoneNumber,
              cnic: cnicNumber,
              password: password
            }
          ])
          .select();
        
        if (error) {
          console.error("Error creating employer:", error);
          throw new Error(error.message);
        }
        
        if (!newEmployer || newEmployer.length === 0) {
          throw new Error('Failed to create employer account');
        }
        
        userId = newEmployer[0].empid;
      } else {
        throw new Error('Invalid role specified');
      }
      
      // Create user profile and set as current user
      const newUser: UserProfile = {
        id: userId.toString(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        cnic: userData.cnic,
        role: userData.role
      };
      
      setUser(newUser);
      localStorage.setItem('workedIn_user', JSON.stringify(newUser));
      toast.success("Registration successful!");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('workedIn_user');
    toast.success("Logged out successfully");
  };
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
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
