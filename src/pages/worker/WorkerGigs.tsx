
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, formatCurrency, getSkillsForEntity } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface Gig {
  gigid: number;
  gigtitle: string;
  gigdescription: string;
  gigbudget: number;
  address: string;
  city: string;
  skills: string[];
  empid: number;
  employerName: string;
  status: string;
  timestamp: string;
}

const WorkerGigs = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [applicationGig, setApplicationGig] = useState<Gig | null>(null);
  const [proposedPrice, setProposedPrice] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

  // Fetch cities from Supabase
  const { data: cities = [], isLoading: citiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gigs')
        .select('city')
        .order('city')
        .eq('status', 'open');
      
      if (error) {
        console.error('Error fetching cities:', error);
        toast.error('Failed to load cities');
        throw error;
      }
      
      // Filter out duplicates and null values
      const uniqueCities = [...new Set(data.map(item => item.city).filter(Boolean))];
      return uniqueCities.map((name, index) => ({ id: index.toString(), name }));
    }
  });

  // Fetch gigs from Supabase
  const { data: gigs = [], isLoading, error } = useQuery({
    queryKey: ['gigs', selectedCity, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('gigs')
        .select(`
          *,
          employer:empid(name)
        `)
        .eq('status', 'open');
      
      // Apply city filter if selected
      if (selectedCity) {
        query = query.eq('city', selectedCity);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching gigs:', error);
        toast.error('Failed to load gigs');
        throw error;
      }
      
      // Format the gigs data with skills
      return Promise.all(data.map(async (gig) => {
        // Get skills for this gig
        const skills = await getSkillsForEntity(gig.gigid, 'gig');
        
        return {
          gigid: gig.gigid,
          gigtitle: gig.gigtitle || 'Untitled Gig',
          gigdescription: gig.gigdescription || 'No description available',
          gigbudget: gig.gigbudget || 0,
          address: gig.address || 'Address not provided',
          city: gig.city || 'City not specified',
          skills,
          empid: gig.empid,
          employerName: gig.employer?.name || 'Unknown Employer',
          status: gig.status || 'open',
          timestamp: gig.timestamp || new Date().toISOString()
        };
      }));
    }
  });

  // Filter gigs based on search term
  const filteredGigs = gigs.filter(gig => {
    return searchTerm === '' || 
      gig.gigtitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
      gig.gigdescription.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleApply = async () => {
    if (!user) {
      toast.error('You need to be logged in to apply for gigs');
      return;
    }

    if (remarks.trim() === '' || !proposedPrice || isNaN(Number(proposedPrice)) || Number(proposedPrice) <= 0) {
      toast.error('Please enter a valid price and remarks');
      return;
    }
    
    try {
      // First get the worker ID
      const { data: workerData, error: workerError } = await supabase
        .from('worker')
        .select('workerid')
        .eq('email', user.email)
        .single();

      if (workerError) throw workerError;
      
      if (!workerData || !workerData.workerid) {
        toast.error('Worker profile not found');
        return;
      }

      // Check if already applied
      const { data: existingApplication, error: checkError } = await supabase
        .from('gig_applied')
        .select('appliedid')
        .eq('workerid', workerData.workerid)
        .eq('gigid', applicationGig?.gigid)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingApplication) {
        toast.error('You have already applied for this gig');
        setIsDialogOpen(false);
        return;
      }

      // Submit the application
      const { error: submitError } = await supabase
        .from('gig_applied')
        .insert({
          gigid: applicationGig?.gigid,
          workerid: workerData.workerid,
          gigprice: Number(proposedPrice),
          remarks: remarks,
          status: 'pending',
          timestamp: new Date().toISOString()
        });

      if (submitError) throw submitError;
      
      toast.success('Application submitted successfully!');
      setProposedPrice('');
      setRemarks('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="container-custom my-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Find Gigs</h1>
            <Card className="p-6">
              <p className="text-red-500">Error loading gigs. Please try again later.</p>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

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
                {cities.map(city => (
                  <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Gigs Listing */}
          <div className="space-y-4">
            {isLoading ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500">Loading gigs...</p>
                </CardContent>
              </Card>
            ) : filteredGigs.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500">No gigs found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filteredGigs.map(gig => (
                <Card key={gig.gigid} className="card-shadow hover:border-workedIn-green transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <CardTitle>{gig.gigtitle}</CardTitle>
                      <Badge variant="secondary" className="bg-workedIn-lightGreen text-workedIn-green mt-2 md:mt-0">
                        {gig.city}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-gray-600 mb-2">{gig.gigdescription}</p>
                      <p className="font-semibold text-workedIn-green">{formatCurrency(gig.gigbudget)}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Location: {gig.address}, {gig.city}</p>
                      <p className="text-sm text-gray-500">Posted by: {gig.employerName}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gig.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="bg-workedIn-lightGreen text-workedIn-green">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <Dialog open={isDialogOpen && applicationGig?.gigid === gig.gigid} onOpenChange={(open) => {
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
                            <DialogTitle>Apply for {gig.gigtitle}</DialogTitle>
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
                              <p className="text-xs text-gray-500 mt-1">Employer's budget: {formatCurrency(gig.gigbudget)}</p>
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
