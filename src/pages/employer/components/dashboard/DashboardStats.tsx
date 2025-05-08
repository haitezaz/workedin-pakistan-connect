
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Job, Gig } from '@/types/jobs';

interface DashboardStatsProps {
  jobs: Job[];
  gigs: Gig[];
  jobApplicationsCount: number;
  gigApplicationsCount: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  jobs, 
  gigs, 
  jobApplicationsCount, 
  gigApplicationsCount 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Active Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-workedIn-blue">{jobs.filter(job => job.status === 'open').length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Active Gigs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-workedIn-green">{gigs.filter(gig => gig.status === 'open' || gig.status === 'in-progress').length}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">New Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-amber-500">{jobApplicationsCount + gigApplicationsCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-gray-500">
            {jobs.filter(job => job.status === 'filled').length + gigs.filter(gig => gig.status === 'completed').length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
