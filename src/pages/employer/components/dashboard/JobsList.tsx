
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Job, JobStatus } from '@/types/jobs';
import JobItem from './JobItem';

interface JobsListProps {
  jobs: Job[];
  jobApplications: any[];
  formatCurrency: (amount: number) => string;
  getStatusBadge: (status: JobStatus) => React.ReactNode;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, jobApplications, formatCurrency, getStatusBadge }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Job Postings</CardTitle>
        <CardDescription>Manage your current and past job listings</CardDescription>
      </CardHeader>
      <CardContent>
        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map(job => (
              <JobItem 
                key={job.id} 
                job={job} 
                applicationCount={jobApplications.filter(app => app.jobId === job.id).length}
                formatCurrency={formatCurrency}
                getStatusBadge={getStatusBadge}
              />
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
  );
};

export default JobsList;
