
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job, JobStatus } from '@/types/jobs';

interface JobItemProps {
  job: Job;
  applicationCount: number;
  formatCurrency: (amount: number) => string;
  getStatusBadge: (status: JobStatus) => React.ReactNode;
}

const JobItem: React.FC<JobItemProps> = ({ job, applicationCount, formatCurrency, getStatusBadge }) => {
  return (
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
          <span>Applications: {applicationCount}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobItem;
