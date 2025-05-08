
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { JobType } from '@/types/jobs';

// Mock cities
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

// Mock skills
const availableSkills = [
  'Carpentry', 'Electrical Wiring', 'Plumbing', 'Painting', 'Gardening', 
  'House Cleaning', 'Driving', 'Security', 'Cooking', 'Teaching',
  'Computer Repair', 'Web Development', 'Data Entry', 'Accounting',
  'Customer Service', 'Sales', 'Marketing', 'Administration', 'Healthcare'
];

const EmployerPost = () => {
  // State for job posting
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    city: '',
    jobType: 'full-time' as JobType,
    requiredSkills: [] as string[]
  });

  // State for gig posting
  const [gigForm, setGigForm] = useState({
    title: '',
    description: '',
    budget: '',
    address: '',
    city: '',
    requiredSkills: [] as string[]
  });

  const [selectedTab, setSelectedTab] = useState('job');
  const [selectedSkill, setSelectedSkill] = useState('');

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!jobForm.title || !jobForm.description || !jobForm.salary || !jobForm.location || !jobForm.city) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (jobForm.requiredSkills.length === 0) {
      toast.error('Please add at least one required skill');
      return;
    }
    
    console.log('Submitting job:', jobForm);
    toast.success('Job posted successfully!');
    
    // Reset form
    setJobForm({
      title: '',
      description: '',
      salary: '',
      location: '',
      city: '',
      jobType: 'full-time',
      requiredSkills: []
    });
  };

  const handleGigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!gigForm.title || !gigForm.description || !gigForm.budget || !gigForm.address || !gigForm.city) {
      toast.error('Please fill all required fields');
      return;
    }
    
    if (gigForm.requiredSkills.length === 0) {
      toast.error('Please add at least one required skill');
      return;
    }
    
    console.log('Submitting gig:', gigForm);
    toast.success('Gig posted successfully!');
    
    // Reset form
    setGigForm({
      title: '',
      description: '',
      budget: '',
      address: '',
      city: '',
      requiredSkills: []
    });
  };

  const addSkillToJob = () => {
    if (selectedSkill && !jobForm.requiredSkills.includes(selectedSkill)) {
      setJobForm({
        ...jobForm,
        requiredSkills: [...jobForm.requiredSkills, selectedSkill]
      });
      setSelectedSkill('');
    }
  };

  const removeSkillFromJob = (skill: string) => {
    setJobForm({
      ...jobForm,
      requiredSkills: jobForm.requiredSkills.filter(s => s !== skill)
    });
  };

  const addSkillToGig = () => {
    if (selectedSkill && !gigForm.requiredSkills.includes(selectedSkill)) {
      setGigForm({
        ...gigForm,
        requiredSkills: [...gigForm.requiredSkills, selectedSkill]
      });
      setSelectedSkill('');
    }
  };

  const removeSkillFromGig = (skill: string) => {
    setGigForm({
      ...gigForm,
      requiredSkills: gigForm.requiredSkills.filter(s => s !== skill)
    });
  };

  return (
    <Layout>
      <div className="container-custom my-8">
        <h1 className="text-3xl font-bold mb-2">Post an Opportunity</h1>
        <p className="text-gray-600 mb-8">Create a job or gig listing to find skilled workers</p>

        <Tabs defaultValue="job" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="job">Post a Job</TabsTrigger>
            <TabsTrigger value="gig">Post a Gig</TabsTrigger>
          </TabsList>
          
          {/* Job Posting Form */}
          <TabsContent value="job">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Post a Job</CardTitle>
                <CardDescription>
                  Jobs are typically longer-term positions with regular working hours and defined responsibilities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJobSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input 
                        id="jobTitle" 
                        placeholder="e.g., Office Assistant" 
                        value={jobForm.title}
                        onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobDescription">Job Description</Label>
                      <Textarea 
                        id="jobDescription" 
                        placeholder="Describe the responsibilities, requirements, and expectations..."
                        rows={5}
                        value={jobForm.description}
                        onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobSalary">Monthly Salary (PKR)</Label>
                        <Input 
                          id="jobSalary" 
                          type="number" 
                          placeholder="e.g., 25000"
                          value={jobForm.salary}
                          onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobType">Job Type</Label>
                        <Select 
                          value={jobForm.jobType} 
                          onValueChange={(value) => setJobForm({...jobForm, jobType: value as JobType})}
                        >
                          <SelectTrigger id="jobType">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full Time</SelectItem>
                            <SelectItem value="part-time">Part Time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobLocation">Location/Address</Label>
                        <Input 
                          id="jobLocation" 
                          placeholder="e.g., Office #123, Main Boulevard"
                          value={jobForm.location}
                          onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobCity">City</Label>
                        <Select 
                          value={jobForm.city} 
                          onValueChange={(value) => setJobForm({...jobForm, city: value})}
                        >
                          <SelectTrigger id="jobCity">
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockCities.map(city => (
                              <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Required Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {jobForm.requiredSkills.map((skill, index) => (
                          <div key={index} className="bg-workedIn-lightBlue text-workedIn-blue text-sm rounded-full px-3 py-1 flex items-center">
                            {skill}
                            <button 
                              type="button"
                              onClick={() => removeSkillFromJob(skill)}
                              className="ml-2 text-workedIn-blue hover:text-workedIn-blue/70"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSkills
                              .filter(skill => !jobForm.requiredSkills.includes(skill))
                              .map(skill => (
                                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="outline" onClick={addSkillToJob}>
                          Add Skill
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-workedIn-blue hover:bg-workedIn-blue/90">
                    Post Job
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Gig Posting Form */}
          <TabsContent value="gig">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Post a Gig</CardTitle>
                <CardDescription>
                  Gigs are short-term tasks or projects with a specific scope and typically a fixed budget.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGigSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gigTitle">Gig Title</Label>
                      <Input 
                        id="gigTitle" 
                        placeholder="e.g., Plumbing Repair for Bathroom" 
                        value={gigForm.title}
                        onChange={(e) => setGigForm({...gigForm, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gigDescription">Gig Description</Label>
                      <Textarea 
                        id="gigDescription" 
                        placeholder="Describe what needs to be done, any specific requirements, and your timeline..."
                        rows={5}
                        value={gigForm.description}
                        onChange={(e) => setGigForm({...gigForm, description: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gigBudget">Budget (PKR)</Label>
                        <Input 
                          id="gigBudget" 
                          type="number" 
                          placeholder="e.g., 2500"
                          value={gigForm.budget}
                          onChange={(e) => setGigForm({...gigForm, budget: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gigAddress">Address</Label>
                        <Input 
                          id="gigAddress" 
                          placeholder="e.g., House #123, Street 4"
                          value={gigForm.address}
                          onChange={(e) => setGigForm({...gigForm, address: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gigCity">City</Label>
                        <Select 
                          value={gigForm.city} 
                          onValueChange={(value) => setGigForm({...gigForm, city: value})}
                        >
                          <SelectTrigger id="gigCity">
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockCities.map(city => (
                              <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Required Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {gigForm.requiredSkills.map((skill, index) => (
                          <div key={index} className="bg-workedIn-lightGreen text-workedIn-green text-sm rounded-full px-3 py-1 flex items-center">
                            {skill}
                            <button 
                              type="button"
                              onClick={() => removeSkillFromGig(skill)}
                              className="ml-2 text-workedIn-green hover:text-workedIn-green/70"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSkills
                              .filter(skill => !gigForm.requiredSkills.includes(skill))
                              .map(skill => (
                                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="outline" onClick={addSkillToGig}>
                          Add Skill
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-workedIn-green hover:bg-workedIn-green/90">
                    Post Gig
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployerPost;
