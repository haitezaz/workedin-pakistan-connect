
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const NavBar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container-custom py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-poppins font-bold text-2xl">
              <span className="text-workedIn-blue">Worked</span>
              <span className="text-workedIn-green">In</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-workedIn-blue transition-colors">
              Home
            </Link>
            {isAuthenticated && user?.role === 'worker' && (
              <>
                <Link to="/worker/jobs" className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Find Jobs
                </Link>
                <Link to="/worker/gigs" className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Find Gigs
                </Link>
                <Link to="/worker/profile" className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Profile
                </Link>
              </>
            )}
            {isAuthenticated && user?.role === 'employer' && (
              <>
                <Link to="/employer/post" className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Post Opportunity
                </Link>
                <Link to="/employer/dashboard" className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Dashboard
                </Link>
              </>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin/dashboard" className="text-gray-700 hover:text-workedIn-blue transition-colors">
                Admin Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Hi, {user?.name.split(' ')[0]}
                </span>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t mt-3 flex flex-col space-y-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-workedIn-blue transition-colors">
              Home
            </Link>
            {isAuthenticated && user?.role === 'worker' && (
              <>
                <Link to="/worker/jobs" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Find Jobs
                </Link>
                <Link to="/worker/gigs" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Find Gigs
                </Link>
                <Link to="/worker/profile" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Profile
                </Link>
              </>
            )}
            {isAuthenticated && user?.role === 'employer' && (
              <>
                <Link to="/employer/post" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Post Opportunity
                </Link>
                <Link to="/employer/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-workedIn-blue transition-colors">
                  Dashboard
                </Link>
              </>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-workedIn-blue transition-colors">
                Admin Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-gray-600">
                  Hi, {user?.name.split(' ')[0]}
                </span>
                <Button variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-workedIn-blue hover:bg-workedIn-blue/90 w-full">Register</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
