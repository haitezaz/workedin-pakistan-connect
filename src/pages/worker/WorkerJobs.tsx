
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { Job, JobType } from '@/types/jobs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';

// Mock data
const mockCities = [
  { id: '1', name: 'Karachi' },
  { id: '2', name: 'Lahore' },
  { id: '3', name: 'Islamabad' },
  { id: '4', name: 'Peshawar' },
  { id: '5', name: 'Quetta' },
  { id: '6', name: 'Multan' },
  { id: '7', name: 'Faisalabad' },
  { id: '8', name: 'Rawalpindi' }
];

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Electrician for Office Wiring',
    description: 'Looking for a skilled electrician to do complete wiring for our new office space. Must have at least 5 years of experience and bring own tools.',
    salary: 25000,
    location: 'DHA Phase 5',
    city: 'Karachi',
    jobType: 'full-time',
    requiredSkills: ['Electrical Wiring', 'Circuit Installation'],
    employerId: '101',
    employerName: 'Alpha Construction Co.',
    status: 'open',
    createdAt: '2023-05-01'
  },
  {
    id: '2',
    title: 'Part-time Driver',
    description: 'Need a professional driver for weekday mornings to drop children to school. Must have valid license and clean driving record.',
    salary: 15000,
    location: 'Bahria Town',
    city: 'Lahore',
    jobType: 'part-time',
    requiredSkills: ['Driving', 'Navigation'],
    employerId: '102',
    employerName: 'Ahmed Family',
    status: 'open',
    createdAt: '2023-05-02'
  },
  {
    id: '3',
    title: 'Construction Site Supervisor',
    description: 'Overseeing construction activities at our residential project. Need someone with experience in building supervision and team management.',
    salary: 45000,
    location: 'Gulberg',
    city: 'Lahore',
    jobType: 'full-time',
    requiredSkills: ['Construction Management', 'Team Leadership'],
    employerId: '103',
    employerName: 'Builders Associates',
    status: 'open',
    createdAt: '2023-05-03'
  },
  {
    id: '4',
    title: 'Office Assistant',
    description: 'Looking for an office assistant to handle administrative tasks, filing, and basic computer operations.',
    salary: 20000,
    location: 'Blue Area',
    city: 'Islamabad',
    jobType: 'full-time',
    requiredSkills: ['MS Office', 'Filing', 'Administration'],
    employerId: '104',
    employerName: 'Tech Solutions Inc.',
    status: 'open',
    createdAt: '2023-05-04'
  },
  {
    id: '5',
    title: 'Security Guard',
    description: 'Need a security guard for night shifts at our warehouse. Previous experience in security preferred.',
    salary: 18000,
    location: 'Korangi Industrial Area',
    city: 'Karachi',
    jobType: 'full-time',
    requiredSkills: ['Security', 'Vigilance'],
    employerId: '105',
    employerName: 'Secure Solutions',
    status: 'open',
    createdAt: '2023-05-05'
  }
];

const WorkerJobs = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<JobType | ''>('');
  const [applicationJob, setApplicationJob] = useState<Job | null>(null);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter jobs based on selected filters
  const filteredJobs = mockJobs.filter(job => {
    return (
      (selectedCity === '' || job.city === selectedCity) &&
      (selectedJobType === '' || job.jobType === selectedJobType) &&
      (searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleApply = () => {
    if (applicationMessage.trim() === '') {
      toast.error('Please enter a message to apply');
      return;
    }
    
    toast.success('Application submitted successfully!');
    setApplicationMessage('');
    setIsDialogOpen(false);
  };

  // Format salary
  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-PK', { 
      style: 'currency', 
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Layout>
      <div className="container-custom my-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Jobs</h1>
          <p className="text-gray-600 mb-6">
            Browse through available job opportunities in your area
          </p>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                {mockCities.map(city => (
                  <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedJobType} onValueChange={(value) => setSelectedJobType(value as JobType | '')}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Jobs Listing */}
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500">No jobs found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map(job => (
                <Card key={job.id} className="card-shadow hover:border-workedIn-blue transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <CardTitle>{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        <Badge variant="secondary" className="bg-workedIn-lightBlue text-workedIn-blue">
                          {job.city}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {job.jobType.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-gray-600 mb-2">{job.description}</p>
                      <p className="font-semibold text-workedIn-blue">{formatSalary(job.salary)}/month</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Location: {job.location}, {job.city}</p>
                      <p className="text-sm text-gray-500">Posted by: {job.employerName}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-workedIn-lightGreen text-workedIn-green">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <Dialog open={isDialogOpen && applicationJob?.id === job.id} onOpenChange={(open) => {
                        if (open) {
                          setApplicationJob(job);
                          setIsDialogOpen(true);
                        } else {
                          setIsDialogOpen(false);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90">Apply Now</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Apply for {job.title}</DialogTitle>
                            <DialogDescription>
                              Send your application for this job opportunity.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 my-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Your Message</label>
                              <Textarea 
                                placeholder="Tell the employer why you're a good fit for this job..."
                                value={applicationMessage}
                                onChange={(e) => setApplicationMessage(e.target.value)}
                                className="resize-none"
                                rows={5}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90" onClick={handleApply}>Submit Application</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerJobs;
