
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Gig, GigStatus } from '@/types/jobs';
import GigItem from './GigItem';

interface GigsListProps {
  gigs: Gig[];
  gigApplications: any[];
  formatCurrency: (amount: number) => string;
  getStatusBadge: (status: GigStatus) => React.ReactNode;
}

const GigsList: React.FC<GigsListProps> = ({ gigs, gigApplications, formatCurrency, getStatusBadge }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Gig Postings</CardTitle>
        <CardDescription>Manage your current and past gig listings</CardDescription>
      </CardHeader>
      <CardContent>
        {gigs.length > 0 ? (
          <div className="space-y-4">
            {gigs.map(gig => (
              <GigItem 
                key={gig.id} 
                gig={gig} 
                proposalCount={gigApplications.filter(app => app.gigId === gig.id).length}
                formatCurrency={formatCurrency}
                getStatusBadge={getStatusBadge}
              />
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
  );
};

export default GigsList;
