
import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, UserProfile, UserRole } from '@/types/auth';
import { toast } from "@/components/ui/sonner";

// Mock function to simulate API calls - replace with actual API calls later
const mockAuthAPI = {
  login: async (email: string, password: string, role: UserRole): Promise<UserProfile> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'worker@test.com' && password === 'password' && role === 'worker') {
      return {
        id: '1',
        email: 'worker@test.com',
        name: 'Test Worker',
        phone: '03001234567',
        cnic: '12345-1234567-1',
        role: 'worker'
      };
    }
    
    if (email === 'employer@test.com' && password === 'password' && role === 'employer') {
      return {
        id: '2',
        email: 'employer@test.com',
        name: 'Test Employer',
        phone: '03007654321',
        cnic: '12345-7654321-1',
        role: 'employer'
      };
    }
    
    if (email === 'admin@test.com' && password === 'password' && role === 'admin') {
      return {
        id: '3',
        email: 'admin@test.com',
        name: 'Admin User',
        phone: '03009876543',
        cnic: '12345-9876543-1',
        role: 'admin'
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  register: async (userData: Partial<UserProfile>, password: string): Promise<UserProfile> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!userData.email || !userData.name || !userData.phone || !userData.cnic || !userData.role || !password) {
      throw new Error('All fields are required');
    }
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      cnic: userData.cnic,
      role: userData.role
    };
  }
};

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
      const userData = await mockAuthAPI.login(email, password, role);
      setUser(userData);
      localStorage.setItem('workedIn_user', JSON.stringify(userData));
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (userData: Partial<UserProfile>, password: string) => {
    setIsLoading(true);
    try {
      const newUser = await mockAuthAPI.register(userData, password);
      setUser(newUser);
      localStorage.setItem('workedIn_user', JSON.stringify(newUser));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
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
