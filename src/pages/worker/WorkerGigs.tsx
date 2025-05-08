
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { Gig } from '@/types/jobs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';

// Mock data
const mockCities = [
  { id: '1', name: 'Karachi' },
  { id: '2', name: 'Lahore' },
  { id: '3', name: 'Islamabad' },
  { id: '4', name: 'Peshawar' },
  { id: '5', name: 'Quetta' },
  { id: '6', name: 'Multan' },
  { id: '7', name: 'Faisalabad' },
  { id: '8', name: 'Rawalpindi' }
];

const mockGigs: Gig[] = [
  {
    id: '1',
    title: 'Plumbing Repair for Bathroom',
    description: 'Need an experienced plumber for bathroom sink and toilet repair. Should have own tools and be available tomorrow.',
    budget: 2500,
    address: '123 Garden Town',
    city: 'Lahore',
    requiredSkills: ['Plumbing', 'Repair'],
    employerId: '201',
    employerName: 'Hassan Ahmed',
    status: 'open',
    createdAt: '2023-05-01'
  },
  {
    id: '2',
    title: 'Weekend Garden Maintenance',
    description: 'Looking for someone to trim plants and maintain garden for a weekend. Regular job opportunity if satisfied.',
    budget: 1500,
    address: '45-B DHA Phase 2',
    city: 'Karachi',
    requiredSkills: ['Gardening', 'Plant Maintenance'],
    employerId: '202',
    employerName: 'Fatima Khan',
    status: 'open',
    createdAt: '2023-05-02'
  },
  {
    id: '3',
    title: 'House Moving Help',
    description: 'Need 3-4 strong individuals to help with moving furniture and boxes to new house. One day job.',
    budget: 4000,
    address: 'F-8 Markaz',
    city: 'Islamabad',
    requiredSkills: ['Heavy Lifting', 'Furniture Moving'],
    employerId: '203',
    employerName: 'Ali Raza',
    status: 'open',
    createdAt: '2023-05-03'
  },
  {
    id: '4',
    title: 'Window AC Installation',
    description: 'Need technician to install 2 window ACs at home. Must have experience with proper installation and testing.',
    budget: 3000,
    address: 'Jinnah Town',
    city: 'Quetta',
    requiredSkills: ['AC Installation', 'Electrical Work'],
    employerId: '204',
    employerName: 'Hamza Brothers Electronics',
    status: 'open',
    createdAt: '2023-05-04'
  },
  {
    id: '5',
    title: 'House Cleaning Service',
    description: 'Need thorough house cleaning including carpets and furniture. Approximately 5-hour job for a 3-bedroom house.',
    budget: 2000,
    address: 'Model Town',
    city: 'Lahore',
    requiredSkills: ['House Cleaning', 'Carpet Cleaning'],
    employerId: '205',
    employerName: 'Zainab Malik',
    status: 'open',
    createdAt: '2023-05-05'
  }
];

const WorkerGigs = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [applicationGig, setApplicationGig] = useState<Gig | null>(null);
  const [proposedPrice, setProposedPrice] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter gigs based on selected filters
  const filteredGigs = mockGigs.filter(gig => {
    return (
      (selectedCity === '' || gig.city === selectedCity) &&
      (searchTerm === '' || 
        gig.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        gig.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleApply = () => {
    if (remarks.trim() === '' || !proposedPrice || isNaN(Number(proposedPrice)) || Number(proposedPrice) <= 0) {
      toast.error('Please enter a valid price and remarks');
      return;
    }
    
    toast.success('Application submitted successfully!');
    setProposedPrice('');
    setRemarks('');
    setIsDialogOpen(false);
  };

  // Format budget
  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-PK', { 
      style: 'currency', 
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Layout>
      <div className="container-custom my-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Gigs</h1>
          <p className="text-gray-600 mb-6">
            Browse through available short-term gigs in your area
          </p>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Input
                placeholder="Search gigs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                {mockCities.map(city => (
                  <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Gigs Listing */}
          <div className="space-y-4">
            {filteredGigs.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500">No gigs found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filteredGigs.map(gig => (
                <Card key={gig.id} className="card-shadow hover:border-workedIn-green transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <CardTitle>{gig.title}</CardTitle>
                      <Badge variant="secondary" className="bg-workedIn-lightGreen text-workedIn-green mt-2 md:mt-0">
                        {gig.city}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-gray-600 mb-2">{gig.description}</p>
                      <p className="font-semibold text-workedIn-green">Budget: {formatBudget(gig.budget)}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Location: {gig.address}, {gig.city}</p>
                      <p className="text-sm text-gray-500">Posted by: {gig.employerName}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gig.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-workedIn-lightGreen text-workedIn-green">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <Dialog open={isDialogOpen && applicationGig?.id === gig.id} onOpenChange={(open) => {
                        if (open) {
                          setApplicationGig(gig);
                          setIsDialogOpen(true);
                        } else {
                          setIsDialogOpen(false);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button className="bg-workedIn-green hover:bg-workedIn-green/90">Apply Now</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Apply for {gig.title}</DialogTitle>
                            <DialogDescription>
                              Send your proposal for this gig opportunity.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 my-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Your Proposed Price (PKR)</label>
                              <Input
                                type="number"
                                placeholder="Enter your price"
                                value={proposedPrice}
                                onChange={(e) => setProposedPrice(e.target.value)}
                              />
                              <p className="text-xs text-gray-500 mt-1">Employer's budget: {formatBudget(gig.budget)}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Your Remarks</label>
                              <Textarea 
                                placeholder="Describe your experience, approach, and why you're suitable for this gig..."
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                className="resize-none"
                                rows={5}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button className="bg-workedIn-green hover:bg-workedIn-green/90" onClick={handleApply}>Submit Proposal</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerGigs;
