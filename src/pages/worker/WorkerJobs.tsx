
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, formatCurrency, getSkillsForEntity } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

// Define Job type based on our database structure
interface Job {
  jobid: number;
  jobtitle: string;
  jobdescription: string;
  jobsalary: number;
  joblocation: string;
  city: string;
  jobtype: string;
  requiredSkills: string[];
  empid: number;
  employerName: string;
  status: string;
  timestamp: string;
}

const WorkerJobs = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [applicationJob, setApplicationJob] = useState<Job | null>(null);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

  // Fetch cities from Supabase
  const { data: cities = [], isLoading: citiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job')
        .select('city')
        .order('city')
        .eq('status', 'open');
      
      if (error) {
        console.error('Error fetching cities:', error);
        toast.error('Failed to load cities');
        throw error;
      }
      
      // Filter out duplicates and null values
      const uniqueCities = [...new Set(data.map(item => item.city).filter(Boolean))];
      return uniqueCities.map((name, index) => ({ id: index.toString(), name }));
    }
  });

  // Fetch jobs from Supabase
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs', selectedCity, selectedJobType, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('job')
        .select(`
          *,
          employer:empid(name)
        `)
        .eq('status', 'open');
      
      // Apply filters if selected
      if (selectedCity) {
        query = query.eq('city', selectedCity);
      }
      
      if (selectedJobType) {
        query = query.eq('jobtype', selectedJobType);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load jobs');
        throw error;
      }
      
      // Format the jobs data with skills
      return Promise.all(data.map(async (job) => {
        // Get skills for this job
        const skills = await getSkillsForEntity(job.jobid, 'job');
        
        return {
          jobid: job.jobid,
          jobtitle: job.jobtitle || 'Untitled Job',
          jobdescription: job.jobdescription || 'No description available',
          jobsalary: job.jobsalary || 0,
          joblocation: job.joblocation || 'Location not provided',
          city: job.city || 'City not specified',
          jobtype: job.jobtype || 'full-time',
          requiredSkills: skills,
          empid: job.empid,
          employerName: job.employer?.name || 'Unknown Employer',
          status: job.status || 'open',
          timestamp: job.timestamp || new Date().toISOString()
        };
      }));
    }
  });

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => {
    return searchTerm === '' || 
      job.jobtitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.jobdescription.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleApply = async () => {
    if (!user) {
      toast.error('You need to be logged in to apply for jobs');
      return;
    }

    if (applicationMessage.trim() === '') {
      toast.error('Please enter a message to apply');
      return;
    }
    
    try {
      // First get the worker ID
      const { data: workerData, error: workerError } = await supabase
        .from('worker')
        .select('workerid')
        .eq('email', user.email)
        .single();

      if (workerError) throw workerError;
      
      if (!workerData || !workerData.workerid) {
        toast.error('Worker profile not found');
        return;
      }

      // Check if already applied
      const { data: existingApplication, error: checkError } = await supabase
        .from('job_worker_applied')
        .select('*')
        .eq('workerid', workerData.workerid)
        .eq('jobid', applicationJob?.jobid)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingApplication) {
        toast.error('You have already applied for this job');
        setIsDialogOpen(false);
        return;
      }

      // Submit the application
      const { error: submitError } = await supabase
        .from('job_worker_applied')
        .insert({
          jobid: applicationJob?.jobid,
          workerid: workerData.workerid,
          messageofinterest: applicationMessage,
          timestamp: new Date().toISOString()
        });

      if (submitError) throw submitError;
      
      toast.success('Application submitted successfully!');
      setApplicationMessage('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="container-custom my-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Find Jobs</h1>
            <Card className="p-6">
              <p className="text-red-500">Error loading jobs. Please try again later.</p>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

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
                {cities.map(city => (
                  <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedJobType} onValueChange={setSelectedJobType}>
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
            {isLoading ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500">Loading jobs...</p>
                </CardContent>
              </Card>
            ) : filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500">No jobs found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map(job => (
                <Card key={job.jobid} className="card-shadow hover:border-workedIn-blue transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <CardTitle>{job.jobtitle}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        <Badge variant="secondary" className="bg-workedIn-lightBlue text-workedIn-blue">
                          {job.city}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {job.jobtype.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-gray-600 mb-2">{job.jobdescription}</p>
                      <p className="font-semibold text-workedIn-blue">{formatCurrency(job.jobsalary)}/month</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Location: {job.joblocation}, {job.city}</p>
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
                      <Dialog open={isDialogOpen && applicationJob?.jobid === job.jobid} onOpenChange={(open) => {
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
                            <DialogTitle>Apply for {job.jobtitle}</DialogTitle>
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
