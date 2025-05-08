
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/jobs';

interface JobApplicationProps {
  application: any;
  job: Job;
}

const JobApplication: React.FC<JobApplicationProps> = ({ application, job }) => {
  return (
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
              {application.skills.map((skill: string, index: number) => (
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
  );
};

export default JobApplication;
