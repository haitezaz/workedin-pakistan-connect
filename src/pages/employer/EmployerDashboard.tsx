import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Job, Gig, JobStatus, GigStatus } from '@/types/jobs';

// Mock data
const mockJobs: Job[] = [
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

const mockGigs: Gig[] = [
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

const mockJobApplications = [
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

const mockGigApplications = [
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

const EmployerDashboard = () => {
  // Format salary and budget
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', { 
      style: 'currency', 
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: JobStatus | GigStatus) => {
    switch(status) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Open</Badge>;
      case 'in-progress':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
      case 'filled':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Filled</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'closed':
        return <Badge variant="outline" className="text-gray-500">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container-custom my-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
            <p className="text-gray-600">Manage your job and gig postings, and review applications</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/employer/post">
              <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90">
                + Post New Opportunity
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-workedIn-blue">{mockJobs.filter(job => job.status === 'open').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Gigs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-workedIn-green">{mockGigs.filter(gig => gig.status === 'open' || gig.status === 'in-progress').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">New Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">{mockJobApplications.length + mockGigApplications.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-500">
                {mockJobs.filter(job => job.status === 'filled').length + mockGigs.filter(gig => gig.status === 'completed').length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="gigs">Gigs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          
          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Your Job Postings</CardTitle>
                <CardDescription>Manage your current and past job listings</CardDescription>
              </CardHeader>
              <CardContent>
                {mockJobs.length > 0 ? (
                  <div className="space-y-4">
                    {mockJobs.map(job => (
                      <Card key={job.id} className="card-shadow">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                              <p className="text-gray-600 mb-2 text-sm">{job.location}, {job.city}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {getStatusBadge(job.status)}
                                <Badge variant="outline" className="capitalize">
                                  {job.jobType.replace('-', ' ')}
                                </Badge>
                              </div>
                              <p className="font-medium text-workedIn-blue mb-2">{formatCurrency(job.salary)}/month</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {job.requiredSkills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="bg-workedIn-lightBlue text-workedIn-blue">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-4 md:mt-0">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              {job.status === 'open' && (
                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                  Close Job
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm text-gray-500">
                            <span>Posted on: {new Date(job.createdAt).toLocaleDateString()}</span>
                            <span>Applications: {mockJobApplications.filter(app => app.jobId === job.id).length}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">You don't have any job postings yet</p>
                    <Link to="/employer/post">
                      <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90">
                        Post Your First Job
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Gigs Tab */}
          <TabsContent value="gigs">
            <Card>
              <CardHeader>
                <CardTitle>Your Gig Postings</CardTitle>
                <CardDescription>Manage your current and past gig listings</CardDescription>
              </CardHeader>
              <CardContent>
                {mockGigs.length > 0 ? (
                  <div className="space-y-4">
                    {mockGigs.map(gig => (
                      <Card key={gig.id} className="card-shadow">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{gig.title}</h3>
                              <p className="text-gray-600 mb-2 text-sm">{gig.address}, {gig.city}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {getStatusBadge(gig.status)}
                              </div>
                              <p className="font-medium text-workedIn-green mb-2">Budget: {formatCurrency(gig.budget)}</p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {gig.requiredSkills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="bg-workedIn-lightGreen text-workedIn-green">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-4 md:mt-0">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              {gig.status === 'open' && (
                                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                  Cancel Gig
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between border-t pt-4 text-sm text-gray-500">
                            <span>Posted on: {new Date(gig.createdAt).toLocaleDateString()}</span>
                            <span>Proposals: {mockGigApplications.filter(app => app.gigId === gig.id).length}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">You don't have any gig postings yet</p>
                    <Link to="/employer/post">
                      <Button className="bg-workedIn-green hover:bg-workedIn-green/90">
                        Post Your First Gig
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>New Applications</CardTitle>
                <CardDescription>Review and respond to worker applications</CardDescription>
              </CardHeader>
              <CardContent>
                {mockJobApplications.length > 0 || mockGigApplications.length > 0 ? (
                  <Tabs defaultValue="jobApplications">
                    <TabsList className="mb-4">
                      <TabsTrigger value="jobApplications">Job Applications</TabsTrigger>
                      <TabsTrigger value="gigApplications">Gig Proposals</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="jobApplications">
                      <div className="space-y-4">
                        {mockJobApplications.map(application => {
                          const job = mockJobs.find(job => job.id === application.jobId);
                          return job ? (
                            <Card key={application.id} className="card-shadow">
                              <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row md:justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold">{application.workerName}</span>
                                      <span className="text-sm text-gray-500">applied for</span>
                                      <span className="font-semibold text-workedIn-blue">{job.title}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                      {application.skills.map((skill, index) => (
                                        <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-md mb-4">
                                      <p className="text-gray-700 italic">"{application.message}"</p>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90">
                                        Accept
                                      </Button>
                                      <Button variant="outline">
                                        View Profile
                                      </Button>
                                      <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        Reject
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : null;
                        })}
                        {mockJobApplications.length === 0 && (
                          <p className="text-center py-4 text-gray-500">No job applications yet.</p>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="gigApplications">
                      <div className="space-y-4">
                        {mockGigApplications.map(application => {
                          const gig = mockGigs.find(gig => gig.id === application.gigId);
                          return gig ? (
                            <Card key={application.id} className="card-shadow">
                              <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row md:justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold">{application.workerName}</span>
                                      <span className="text-sm text-gray-500">proposed for</span>
                                      <span className="font-semibold text-workedIn-green">{gig.title}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                      {application.skills.map((skill, index) => (
                                        <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                    <p className="mb-2">
                                      <span className="font-medium">Proposed Price:</span>{' '}
                                      <span className="text-workedIn-green font-bold">{formatCurrency(application.proposedPrice)}</span>
                                      <span className="text-sm text-gray-500"> (Your budget: {formatCurrency(gig.budget)})</span>
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded-md mb-4">
                                      <p className="text-gray-700 italic">"{application.remarks}"</p>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button className="bg-workedIn-green hover:bg-workedIn-green/90">
                                        Accept
                                      </Button>
                                      <Button variant="outline">
                                        View Profile
                                      </Button>
                                      <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        Reject
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : null;
                        })}
                        {mockGigApplications.length === 0 && (
                          <p className="text-center py-4 text-gray-500">No gig proposals yet.</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">You don't have any applications yet</p>
                    <Link to="/employer/post">
                      <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90">
                        Post New Opportunity
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
