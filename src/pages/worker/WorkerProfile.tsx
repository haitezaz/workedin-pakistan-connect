import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { WorkerProfile, Education } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Mock skills
const availableSkills = [
  'Carpentry', 'Electrical Wiring', 'Plumbing', 'Painting', 'Gardening', 
  'House Cleaning', 'Driving', 'Security', 'Cooking', 'Teaching',
  'Computer Repair', 'Web Development', 'Data Entry', 'Accounting',
  'Customer Service', 'Sales', 'Marketing', 'Administration', 'Healthcare'
];

const WorkerProfilePage = () => {
  const { user } = useAuth();
  
  // Initialize profile with user data or empty values
  const [profile, setProfile] = useState<Partial<WorkerProfile>>({
    id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cnic: user?.cnic || '',
    skills: [],
    hourlyRate: 0,
    availability: 'active',
    education: [],
    averageRating: 0,
    role: 'worker'
  });

  // Add new education form state
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear()
  });

  const [newSkill, setNewSkill] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch worker profile data on component mount
  useEffect(() => {
    if (user?.id) {
      fetchWorkerProfile();
    }
  }, [user]);

  // Fetch worker profile from Supabase
  const fetchWorkerProfile = async () => {
    try {
      // Check if worker exists in the worker table
      const { data: workerData, error: workerError } = await supabase
        .from('worker')
        .select('*')
        .eq('email', user?.email)
        .maybeSingle();
      
      if (workerError) {
        console.error('Error fetching worker:', workerError);
        return;
      }
      
      if (workerData) {
        // Worker exists, update local state with fetched data
        setProfile(prev => ({
          ...prev,
          name: workerData.name || user?.name || '',
          email: workerData.email || user?.email || '',
          phone: workerData.phonenumber?.toString() || user?.phone || '',
          cnic: workerData.cnic?.toString() || user?.cnic || '',
          hourlyRate: workerData.hourlyrate || 0,
          availability: workerData.availabilitystatus === 'active' ? 'active' : 'busy',
        }));
        
        // Fetch worker skills
        await fetchWorkerSkills(workerData.workerid);
        
        // Fetch worker education
        await fetchWorkerEducation(workerData.workerid);
      }
    } catch (error) {
      console.error('Error in fetchWorkerProfile:', error);
      toast.error('Failed to load profile data');
    }
  };
  
  // Fetch worker skills
  const fetchWorkerSkills = async (workerId: number) => {
    try {
      // Join worker_skill and skill tables to get skill names
      const { data: skillsData, error: skillsError } = await supabase
        .from('worker_skill')
        .select(`
          skillid,
          skill:skill_id(skillname)
        `)
        .eq('workerid', workerId);
        
      if (skillsError) {
        console.error('Error fetching skills:', skillsError);
        return;
      }
      
      if (skillsData && skillsData.length > 0) {
        // Extract skill names from the joined query
        const skills = skillsData
          .filter(item => item.skill && typeof item.skill === 'object')
          .map(item => {
            // Type assertion to safely access skillname
            const skillObj = item.skill as { skillname?: string };
            return skillObj.skillname || '';
          })
          .filter(skillName => skillName !== ''); // Filter out empty skill names
          
        setProfile(prev => ({ ...prev, skills: skills }));
      }
    } catch (error) {
      console.error('Error in fetchWorkerSkills:', error);
    }
  };
  
  // Fetch worker education
  const fetchWorkerEducation = async (workerId: number) => {
    try {
      const { data: educationData, error: educationError } = await supabase
        .from('worker_education')
        .select('*')
        .eq('workerid', workerId);
        
      if (educationError) {
        console.error('Error fetching education:', educationError);
        return;
      }
      
      if (educationData && educationData.length > 0) {
        // Map database education to our Education type
        const education = educationData.map(edu => ({
          id: Math.random().toString(36).substr(2, 9), // Generate a client-side ID for now
          institution: edu.title.split(' - ')[0] || '',
          degree: edu.title.split(' - ')[1] || edu.title,
          fieldOfStudy: '',
          startYear: new Date().getFullYear() - 4,
          endYear: new Date().getFullYear()
        }));
        
        setProfile(prev => ({ ...prev, education: education }));
      }
    } catch (error) {
      console.error('Error in fetchWorkerEducation:', error);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!user?.email) {
      toast.error('User email not found');
      return;
    }

    setIsLoading(true);
    
    try {
      // First, check if worker exists
      const { data: existingWorker, error: checkError } = await supabase
        .from('worker')
        .select('workerid')
        .eq('email', user.email)
        .maybeSingle();
        
      if (checkError) {
        console.error('Error checking worker:', checkError);
        toast.error('Failed to update profile');
        setIsLoading(false);
        return;
      }
      
      let workerId: number;
      
      // If worker doesn't exist, create a new one
      if (!existingWorker) {
        const { data: newWorker, error: insertError } = await supabase
          .from('worker')
          .insert([
            { 
              name: profile.name,
              email: profile.email,
              phonenumber: profile.phone ? parseInt(profile.phone, 10) : null,
              cnic: profile.cnic ? parseInt(profile.cnic, 10) : null,
              hourlyrate: profile.hourlyRate,
              availabilitystatus: profile.availability
            }
          ])
          .select('workerid')
          .single();
          
        if (insertError) {
          console.error('Error creating worker:', insertError);
          toast.error('Failed to create worker profile');
          setIsLoading(false);
          return;
        }
        
        workerId = newWorker.workerid;
      } else {
        // Update existing worker
        workerId = existingWorker.workerid;
        
        const { error: updateError } = await supabase
          .from('worker')
          .update({ 
            name: profile.name,
            phonenumber: profile.phone ? parseInt(profile.phone, 10) : null,
            cnic: profile.cnic ? parseInt(profile.cnic, 10) : null,
            hourlyrate: profile.hourlyRate,
            availabilitystatus: profile.availability
          })
          .eq('workerid', workerId);
          
        if (updateError) {
          console.error('Error updating worker:', updateError);
          toast.error('Failed to update profile');
          setIsLoading(false);
          return;
        }
      }
      
      // Handle skills - First, get all skill IDs or create new ones
      if (profile.skills && profile.skills.length > 0) {
        await updateWorkerSkills(workerId, profile.skills);
      }
      
      // Handle education
      if (profile.education && profile.education.length > 0) {
        await updateWorkerEducation(workerId, profile.education);
      }
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update worker skills
  const updateWorkerSkills = async (workerId: number, skills: string[]) => {
    try {
      // First, get all skill IDs or create new ones
      const skillIds = [];
      for (const skillName of skills) {
        // Check if skill exists
        const { data: existingSkill, error: skillCheckError } = await supabase
          .from('skill')
          .select('skillid')
          .eq('skillname', skillName)
          .maybeSingle();
          
        if (skillCheckError) {
          console.error('Error checking skill:', skillCheckError);
          continue;
        }
        
        let skillId;
        if (existingSkill) {
          skillId = existingSkill.skillid;
        } else {
          // Create new skill
          const { data: newSkill, error: skillInsertError } = await supabase
            .from('skill')
            .insert([{ skillname: skillName }])
            .select('skillid')
            .single();
            
          if (skillInsertError) {
            console.error('Error creating skill:', skillInsertError);
            continue;
          }
          
          skillId = newSkill.skillid;
        }
        
        skillIds.push(skillId);
      }
      
      // Delete all existing worker_skill entries for this worker
      const { error: deleteError } = await supabase
        .from('worker_skill')
        .delete()
        .eq('workerid', workerId);
        
      if (deleteError) {
        console.error('Error deleting worker skills:', deleteError);
      }
      
      // Insert new worker_skill entries
      if (skillIds.length > 0) {
        const skillEntries = skillIds.map(skillid => ({
          workerid: workerId,
          skillid: skillid
        }));
        
        const { error: insertError } = await supabase
          .from('worker_skill')
          .insert(skillEntries);
          
        if (insertError) {
          console.error('Error adding worker skills:', insertError);
        }
      }
    } catch (error) {
      console.error('Error in updateWorkerSkills:', error);
    }
  };
  
  // Update worker education
  const updateWorkerEducation = async (workerId: number, education: Education[]) => {
    try {
      // Delete all existing worker_education entries for this worker
      const { error: deleteError } = await supabase
        .from('worker_education')
        .delete()
        .eq('workerid', workerId);
        
      if (deleteError) {
        console.error('Error deleting worker education:', deleteError);
      }
      
      // Insert new worker_education entries
      if (education.length > 0) {
        const educationEntries = education.map(edu => ({
          workerid: workerId,
          title: `${edu.institution} - ${edu.degree}`,
          scoredpercentage: 0 // Default value since we don't have this in the UI
        }));
        
        const { error: insertError } = await supabase
          .from('worker_education')
          .insert(educationEntries);
          
        if (insertError) {
          console.error('Error adding worker education:', insertError);
        }
      }
    } catch (error) {
      console.error('Error in updateWorkerEducation:', error);
    }
  };

  // Add a skill to the profile
  const handleAddSkill = () => {
    if (newSkill && !profile.skills?.includes(newSkill)) {
      setProfile({
        ...profile,
        skills: [...(profile.skills || []), newSkill]
      });
      setNewSkill('');
      setIsAddingSkill(false);
      toast.success('Skill added successfully!');
    }
  };

  // Remove a skill from the profile
  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills?.filter(skill => skill !== skillToRemove)
    });
    toast.success('Skill removed successfully!');
  };

  // Add education to the profile
  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree && newEducation.fieldOfStudy) {
      const education: Education = {
        id: Math.random().toString(36).substr(2, 9),
        ...newEducation
      };
      
      setProfile({
        ...profile,
        education: [...(profile.education || []), education]
      });
      
      // Reset form
      setNewEducation({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear()
      });
      
      setIsAddingEducation(false);
      toast.success('Education added successfully!');
    } else {
      toast.error('Please fill all required education fields.');
    }
  };

  // Remove education from the profile
  const handleRemoveEducation = (educationId: string) => {
    setProfile({
      ...profile,
      education: profile.education?.filter(edu => edu.id !== educationId)
    });
    toast.success('Education removed successfully!');
  };

  // Toggle availability status
  const toggleAvailability = () => {
    const newAvailability = profile.availability === 'active' ? 'busy' : 'active';
    setProfile({
      ...profile,
      availability: newAvailability
    });
    toast.success(`Status updated to ${newAvailability}`);
  };

  // Generate year options for education
  const yearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= currentYear - 50; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <Layout>
      <div className="container-custom my-8">
        <h1 className="text-3xl font-bold mb-2">Worker Profile</h1>
        <p className="text-gray-600 mb-6">Manage your profile information to help employers find you</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})} 
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={profile.phone} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnic">CNIC</Label>
                    <Input 
                      id="cnic" 
                      value={profile.cnic} 
                      onChange={(e) => setProfile({...profile, cnic: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate (PKR)</Label>
                    <Input 
                      id="hourlyRate" 
                      type="number" 
                      value={profile.hourlyRate?.toString() || '0'} 
                      onChange={(e) => setProfile({...profile, hourlyRate: Number(e.target.value)})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Availability Status</Label>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={profile.availability === 'active'} 
                        onCheckedChange={toggleAvailability}
                      />
                      <span className={`text-sm ${profile.availability === 'active' ? 'text-workedIn-green' : 'text-gray-500'}`}>
                        {profile.availability === 'active' ? 'Available for Work' : 'Currently Busy'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio / About Me</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell employers about yourself, your experience, and why they should hire you..."
                    rows={4}
                  />
                </div>
                
                <Button 
                  className="bg-workedIn-blue hover:bg-workedIn-blue/90" 
                  onClick={handleUpdateProfile}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="card-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Skills</CardTitle>
                  <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Add Skill</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a Skill</DialogTitle>
                        <DialogDescription>
                          Select a skill from the list or enter your own.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 my-4">
                        <Select value={newSkill} onValueChange={setNewSkill}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSkills.filter(skill => !profile.skills?.includes(skill)).map(skill => (
                              <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingSkill(false)}>Cancel</Button>
                        <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90" onClick={handleAddSkill}>Add Skill</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {profile.skills && profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} className="bg-workedIn-lightBlue text-workedIn-blue py-1 px-3 flex items-center gap-2">
                        {skill}
                        <button 
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 text-workedIn-blue hover:text-workedIn-blue/80"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No skills added yet. Add some skills to help employers find you.</p>
                )}
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="card-shadow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Education</CardTitle>
                  <Dialog open={isAddingEducation} onOpenChange={setIsAddingEducation}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Add Education</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Education</DialogTitle>
                        <DialogDescription>
                          Add your educational background.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 my-4">
                        <div>
                          <Label htmlFor="institution">Institution</Label>
                          <Input 
                            id="institution" 
                            value={newEducation.institution} 
                            onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="degree">Degree / Certificate</Label>
                          <Input 
                            id="degree" 
                            value={newEducation.degree} 
                            onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="fieldOfStudy">Field of Study</Label>
                          <Input 
                            id="fieldOfStudy" 
                            value={newEducation.fieldOfStudy} 
                            onChange={(e) => setNewEducation({...newEducation, fieldOfStudy: e.target.value})} 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startYear">Start Year</Label>
                            <Select 
                              value={newEducation.startYear.toString()} 
                              onValueChange={(value) => setNewEducation({...newEducation, startYear: Number(value)})}
                            >
                              <SelectTrigger id="startYear">
                                <SelectValue placeholder="Start Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {yearOptions().map(year => (
                                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="endYear">End Year</Label>
                            <Select 
                              value={newEducation.endYear.toString()} 
                              onValueChange={(value) => setNewEducation({...newEducation, endYear: Number(value)})}
                            >
                              <SelectTrigger id="endYear">
                                <SelectValue placeholder="End Year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">Present</SelectItem>
                                {yearOptions().map(year => (
                                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingEducation(false)}>Cancel</Button>
                        <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90" onClick={handleAddEducation}>Add Education</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {profile.education && profile.education.length > 0 ? (
                  <div className="space-y-4">
                    {profile.education.map((edu) => (
                      <div key={edu.id} className="border rounded-lg p-4 relative">
                        <button 
                          onClick={() => handleRemoveEducation(edu.id)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-600">{edu.fieldOfStudy}</p>
                        <p className="text-sm text-gray-500">
                          {edu.startYear} - {edu.endYear ? edu.endYear : 'Present'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No education added yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Summary and Reviews */}
          <div className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl text-gray-500">{profile.name?.charAt(0) || 'W'}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className={`text-sm ${profile.availability === 'active' ? 'text-workedIn-green' : 'text-gray-500'}`}>
                    {profile.availability === 'active' ? '● Available for Work' : '● Currently Busy'}
                  </p>
                </div>

                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {profile.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {profile.phone}
                  </p>
                </div>

                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-2">Rate</h3>
                  <p className="text-xl font-bold text-workedIn-blue">
                    PKR {profile.hourlyRate || 0} <span className="text-sm font-normal text-gray-500">/ hour</span>
                  </p>
                </div>

                <Separator />
                
                {profile.skills && profile.skills.length > 0 && (
                  <>
                    <div>
                      <h3 className="font-semibold mb-2">Top Skills</h3>
                      <div className="flex flex-wrap gap-1">
                        {profile.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-workedIn-lightBlue text-workedIn-blue">
                            {skill}
                          </Badge>
                        ))}
                        {profile.skills.length > 5 && (
                          <Badge variant="outline">+{profile.skills.length - 5} more</Badge>
                        )}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}
                
                <div className="text-center pt-2">
                  <Button className="w-full bg-workedIn-blue hover:bg-workedIn-blue/90">Preview Public Profile</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-workedIn-blue mb-2">
                    {profile.averageRating || 'N/A'}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.round(profile.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {profile.averageRating ? 'Based on employer reviews' : 'No reviews yet'}
                  </p>
                </div>

                {/* Mock reviews would go here */}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Complete gigs and jobs to earn reviews from employers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkerProfilePage;
