
export type UserRole = 'worker' | 'employer' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  cnic: string;
  role: UserRole;
}

export interface WorkerProfile extends UserProfile {
  skills: string[];
  hourlyRate: number;
  availability: 'active' | 'busy';
  education: Education[];
  averageRating: number;
}

export interface EmployerProfile extends UserProfile {
  company?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (userData: Partial<UserProfile>, password: string) => Promise<void>;
  logout: () => void;
}
