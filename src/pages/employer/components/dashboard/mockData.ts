
import { Job, Gig } from '@/types/jobs';

// Mock data
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Office Assistant',
    description: 'Looking for an office assistant to handle administrative tasks, filing, and basic computer operations.',
    salary: 20000,
    location: 'Main Boulevard',
    city: 'Lahore',
    jobType: 'full-time',
    requiredSkills: ['MS Office', 'Filing', 'Administration'],
    employerId: '101',
    employerName: 'Your Company',
    status: 'open',
    createdAt: '2023-05-01'
  },
  {
    id: '2',
    title: 'Security Guard',
    description: 'Need a security guard for night shifts at our warehouse. Previous experience in security preferred.',
    salary: 18000,
    location: 'Industrial Area',
    city: 'Karachi',
    jobType: 'full-time',
    requiredSkills: ['Security', 'Vigilance'],
    employerId: '101',
    employerName: 'Your Company',
    status: 'filled',
    createdAt: '2023-04-15'
  }
];

export const mockGigs: Gig[] = [
  {
    id: '1',
    title: 'Plumbing Repair',
    description: 'Fix bathroom sink and toilet. Should have own tools.',
    budget: 2500,
    address: 'House #123, Street 4',
    city: 'Lahore',
    requiredSkills: ['Plumbing', 'Repair'],
    employerId: '101',
    employerName: 'Your Company',
    status: 'open',
    createdAt: '2023-05-10'
  },
  {
    id: '2',
    title: 'Garden Maintenance',
    description: 'Trim plants and maintain garden for a weekend.',
    budget: 1500,
    address: '45-B DHA Phase 2',
    city: 'Lahore',
    requiredSkills: ['Gardening', 'Plant Maintenance'],
    employerId: '101',
    employerName: 'Your Company',
    status: 'in-progress',
    createdAt: '2023-05-05'
  },
  {
    id: '3',
    title: 'Window AC Installation',
    description: 'Install 2 window ACs with proper testing.',
    budget: 3000,
    address: 'Model Town',
    city: 'Lahore',
    requiredSkills: ['AC Installation', 'Electrical Work'],
    employerId: '101',
    employerName: 'Your Company',
    status: 'completed',
    createdAt: '2023-04-20'
  }
];

export const mockJobApplications = [
  {
    id: '101',
    jobId: '1',
    workerId: '201',
    workerName: 'Ahmed Khan',
    skills: ['MS Office', 'Administration', 'Customer Service'],
    message: "I have 2 years of experience as an administrative assistant and am proficient in all MS Office applications.",
    status: 'pending'
  },
  {
    id: '102',
    jobId: '1',
    workerId: '202',
    workerName: 'Sara Ali',
    skills: ['MS Office', 'Filing', 'Data Entry'],
    message: "I have worked in office administration for the past 3 years and would be a great fit for this position.",
    status: 'pending'
  }
];

export const mockGigApplications = [
  {
    id: '201',
    gigId: '1',
    workerId: '301',
    workerName: 'Imran Malik',
    skills: ['Plumbing', 'Repair', 'Maintenance'],
    proposedPrice: 2200,
    remarks: "I am an experienced plumber and can fix your issues quickly. I have all necessary tools.",
    status: 'pending'
  },
  {
    id: '202',
    gigId: '1',
    workerId: '302',
    workerName: 'Yasir Shah',
    skills: ['Plumbing', 'Repair'],
    proposedPrice: 2800,
    remarks: "I have 5 years experience fixing all types of plumbing issues. I guarantee quality work.",
    status: 'pending'
  }
];
