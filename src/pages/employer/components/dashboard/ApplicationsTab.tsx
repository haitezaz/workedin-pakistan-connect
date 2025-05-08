
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Job, Gig } from '@/types/jobs';
import JobApplicationsList from './JobApplicationsList';
import GigApplicationsList from './GigApplicationsList';

interface ApplicationsTabProps {
  jobApplications: any[];
  gigApplications: any[];
  jobs: Job[];
  gigs: Gig[];
  formatCurrency: (amount: number) => string;
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({ 
  jobApplications, 
  gigApplications, 
  jobs, 
  gigs, 
  formatCurrency 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Applications</CardTitle>
        <CardDescription>Review and respond to worker applications</CardDescription>
      </CardHeader>
      <CardContent>
        {jobApplications.length > 0 || gigApplications.length > 0 ? (
          <Tabs defaultValue="jobApplications">
            <TabsList className="mb-4">
              <TabsTrigger value="jobApplications">Job Applications</TabsTrigger>
              <TabsTrigger value="gigApplications">Gig Proposals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobApplications">
              <JobApplicationsList jobApplications={jobApplications} jobs={jobs} />
            </TabsContent>
            
            <TabsContent value="gigApplications">
              <GigApplicationsList 
                gigApplications={gigApplications} 
                gigs={gigs} 
                formatCurrency={formatCurrency} 
              />
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
  );
};

export default ApplicationsTab;
