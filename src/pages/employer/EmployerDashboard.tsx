
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Components
import DashboardStats from './components/dashboard/DashboardStats';
import JobsList from './components/dashboard/JobsList';
import GigsList from './components/dashboard/GigsList';
import ApplicationsTab from './components/dashboard/ApplicationsTab';

// Utilities
import { formatCurrency, getStatusBadge } from './components/dashboard/util';

// Mock data
import { 
  mockJobs, 
  mockGigs, 
  mockJobApplications, 
  mockGigApplications 
} from './components/dashboard/mockData';

const EmployerDashboard = () => {
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

        <DashboardStats 
          jobs={mockJobs} 
          gigs={mockGigs} 
          jobApplicationsCount={mockJobApplications.length} 
          gigApplicationsCount={mockGigApplications.length} 
        />

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="gigs">Gigs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          
          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <JobsList 
              jobs={mockJobs}
              jobApplications={mockJobApplications}
              formatCurrency={formatCurrency}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          {/* Gigs Tab */}
          <TabsContent value="gigs">
            <GigsList 
              gigs={mockGigs}
              gigApplications={mockGigApplications}
              formatCurrency={formatCurrency}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          
          {/* Applications Tab */}
          <TabsContent value="applications">
            <ApplicationsTab 
              jobApplications={mockJobApplications}
              gigApplications={mockGigApplications}
              jobs={mockJobs}
              gigs={mockGigs}
              formatCurrency={formatCurrency}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
