
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type GigStatus = 'open' | 'in-progress' | 'completed' | 'closed';
export type JobStatus = 'open' | 'filled' | 'closed';

export interface Skill {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  address: string;
  city: string;
  requiredSkills: string[];
  employerId: string;
  employerName: string;
  status: GigStatus;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  salary: number;
  location: string;
  city: string;
  jobType: JobType;
  requiredSkills: string[];
  employerId: string;
  employerName: string;
  status: JobStatus;
  createdAt: string;
}

export interface GigApplication {
  id: string;
  gigId: string;
  workerId: string;
  proposedPrice: number;
  remarks: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  workerId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
