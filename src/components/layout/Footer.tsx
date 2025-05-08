
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-workedIn-blue text-white mt-12 py-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-poppins font-bold text-2xl text-white">
                Worked<span className="text-workedIn-green">In</span>
              </span>
            </Link>
            <p className="text-sm text-gray-200">
              Connecting Pakistani workers with local opportunities for gigs and jobs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/worker/jobs" className="text-gray-200 hover:text-white text-sm">Find Jobs</Link>
              </li>
              <li>
                <Link to="/worker/gigs" className="text-gray-200 hover:text-white text-sm">Find Gigs</Link>
              </li>
              <li>
                <Link to="/employer/post" className="text-gray-200 hover:text-white text-sm">Post a Job</Link>
              </li>
            </ul>
          </div>

          {/* For Workers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Workers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/worker/profile" className="text-gray-200 hover:text-white text-sm">Create Profile</Link>
              </li>
              <li>
                <Link to="/worker/jobs" className="text-gray-200 hover:text-white text-sm">Browse Jobs</Link>
              </li>
              <li>
                <Link to="/worker/gigs" className="text-gray-200 hover:text-white text-sm">Browse Gigs</Link>
              </li>
              <li>
                <Link to="/help/workers" className="text-gray-200 hover:text-white text-sm">Help Center</Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/employer/post" className="text-gray-200 hover:text-white text-sm">Post Opportunity</Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="text-gray-200 hover:text-white text-sm">Manage Listings</Link>
              </li>
              <li>
                <Link to="/help/employers" className="text-gray-200 hover:text-white text-sm">Help Center</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} WorkedIn Pakistan. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-300 hover:text-white text-sm">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
