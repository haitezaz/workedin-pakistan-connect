
import React from 'react';
import { Job } from '@/types/jobs';
import JobApplication from './JobApplication';

interface JobApplicationsListProps {
  jobApplications: any[];
  jobs: Job[];
}

const JobApplicationsList: React.FC<JobApplicationsListProps> = ({ jobApplications, jobs }) => {
  return (
    <div className="space-y-4">
      {jobApplications.map(application => {
        const job = jobs.find(job => job.id === application.jobId);
        return job ? (
          <JobApplication 
            key={application.id} 
            application={application} 
            job={job} 
          />
        ) : null;
      })}
      {jobApplications.length === 0 && (
        <p className="text-center py-4 text-gray-500">No job applications yet.</p>
      )}
    </div>
  );
};

export default JobApplicationsList;
