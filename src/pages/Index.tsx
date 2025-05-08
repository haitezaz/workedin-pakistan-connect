
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-workedIn-blue to-workedIn-blue/80 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connect with Local Opportunities in Pakistan
              </h1>
              <p className="text-xl mb-8">
                Find gigs, jobs, and projects in your area or post opportunities to hire skilled workers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/worker/jobs">
                  <Button size="lg" className="bg-workedIn-green hover:bg-workedIn-green/90 text-white">
                    Find Work
                  </Button>
                </Link>
                <Link to="/employer/post">
                  <Button size="lg" variant="outline" className="bg-white text-workedIn-blue hover:bg-gray-100">
                    Post a Job
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="https://placehold.co/600x400/e6f7ff/0F4C81?text=WorkedIn+Pakistan+Connect" 
                  alt="WorkedIn Pakistan Connect" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Workers */}
            <Card className="card-shadow border-t-4 border-t-workedIn-blue">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-workedIn-lightBlue text-workedIn-blue font-bold text-xl">1</div>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">For Workers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-blue font-bold">•</span>
                    <span>Create your profile and highlight your skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-blue font-bold">•</span>
                    <span>Browse jobs and gigs in your city</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-blue font-bold">•</span>
                    <span>Apply with your proposal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-blue font-bold">•</span>
                    <span>Get hired and build your reputation</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Link to="/register">
                    <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90">Join as Worker</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* For Employers */}
            <Card className="card-shadow border-t-4 border-t-workedIn-green">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-workedIn-lightGreen text-workedIn-green font-bold text-xl">2</div>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">For Employers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-green font-bold">•</span>
                    <span>Create your employer account</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-green font-bold">•</span>
                    <span>Post gigs for short-term help</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-green font-bold">•</span>
                    <span>Post jobs for long-term positions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-green font-bold">•</span>
                    <span>Review applications and hire workers</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Link to="/register">
                    <Button className="bg-workedIn-green hover:bg-workedIn-green/90">Join as Employer</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Platform Benefits */}
            <Card className="card-shadow border-t-4 border-t-workedIn-darkGray">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-workedIn-darkGray font-bold text-xl">3</div>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Platform Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-darkGray font-bold">•</span>
                    <span>Trusted verification process</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-darkGray font-bold">•</span>
                    <span>City-based matching</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-darkGray font-bold">•</span>
                    <span>Skills-based opportunity matching</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-workedIn-darkGray font-bold">•</span>
                    <span>Rating system for quality assurance</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Link to="/about">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Categories</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Find opportunities in various skill categories across Pakistan
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Construction', 'Electrical', 'Plumbing', 'Cleaning', 'Driving', 'Cooking', 'Teaching', 'Security', 'Gardening', 'IT Support', 'Office Work', 'Healthcare'].map((category, index) => (
              <Link key={index} to={`/worker/jobs?category=${category.toLowerCase()}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 text-center card-shadow">
                  <div className="mb-3 h-12 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-workedIn-lightBlue flex items-center justify-center">
                      <span className="text-workedIn-blue font-semibold">{category.charAt(0)}</span>
                    </div>
                  </div>
                  <h3 className="font-medium">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-workedIn-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join WorkedIn Pakistan Connect today and start finding opportunities or skilled workers in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?role=worker">
              <Button size="lg" className="bg-white text-workedIn-blue hover:bg-gray-100">
                Register as Worker
              </Button>
            </Link>
            <Link to="/register?role=employer">
              <Button size="lg" className="bg-workedIn-green hover:bg-workedIn-green/90 text-white">
                Register as Employer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
