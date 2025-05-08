
import React from 'react';
import { Gig } from '@/types/jobs';
import GigApplication from './GigApplication';

interface GigApplicationsListProps {
  gigApplications: any[];
  gigs: Gig[];
  formatCurrency: (amount: number) => string;
}

const GigApplicationsList: React.FC<GigApplicationsListProps> = ({ gigApplications, gigs, formatCurrency }) => {
  return (
    <div className="space-y-4">
      {gigApplications.map(application => {
        const gig = gigs.find(gig => gig.id === application.gigId);
        return gig ? (
          <GigApplication 
            key={application.id} 
            application={application} 
            gig={gig} 
            formatCurrency={formatCurrency}
          />
        ) : null;
      })}
      {gigApplications.length === 0 && (
        <p className="text-center py-4 text-gray-500">No gig proposals yet.</p>
      )}
    </div>
  );
};

export default GigApplicationsList;
