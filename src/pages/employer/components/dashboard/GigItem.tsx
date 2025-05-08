
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gig, GigStatus } from '@/types/jobs';

interface GigItemProps {
  gig: Gig;
  proposalCount: number;
  formatCurrency: (amount: number) => string;
  getStatusBadge: (status: GigStatus) => React.ReactNode;
}

const GigItem: React.FC<GigItemProps> = ({ gig, proposalCount, formatCurrency, getStatusBadge }) => {
  return (
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
          <span>Proposals: {proposalCount}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GigItem;
