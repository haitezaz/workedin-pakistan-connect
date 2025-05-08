
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { JobStatus, GigStatus } from '@/types/jobs';

// Format salary and budget
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PK', { 
    style: 'currency', 
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getStatusBadge = (status: JobStatus | GigStatus) => {
  switch(status) {
    case 'open':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Open</Badge>;
    case 'in-progress':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
    case 'filled':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Filled</Badge>;
    case 'completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    case 'closed':
      return <Badge variant="outline" className="text-gray-500">Closed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
