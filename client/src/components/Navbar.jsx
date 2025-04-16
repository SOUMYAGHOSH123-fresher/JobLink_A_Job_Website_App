import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [showPlansDropdown, setShowPlansDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setShowRecruiterLogin, companyToken, companyData } = useContext(AppContext);

  // Check if we're on the home page or dashboard
  const isHomePage = location.pathname === '/';
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Handle logo click based on user type
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (companyToken) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  // Handle plan navigation
  const handlePlanNavigation = (path) => {
    setShowPlansDropdown(false);
    navigate(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer"
          >
            <h1 className="text-2xl font-bold">
              <span className="text-green-500">Job</span>
              <span className="text-blue-600">Link</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Show Home button when not on home page or when in dashboard */}
            {(!isHomePage || isDashboard) && (
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
            )}
            
            {/* Plans Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowPlansDropdown(!showPlansDropdown)}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
              >
                Plans
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showPlansDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                  {!companyToken ? (
                    <>
                      <button 
                        onClick={() => handlePlanNavigation('/plans/job-seeker')} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Job Seeker Plans
                      </button>
                      
                      {!user && <button 
                        onClick={() => handlePlanNavigation('/plans/recruiter')} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Recruiter Plans
                      </button>}
                      <button 
                        onClick={() => handlePlanNavigation('/subscriptions')} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        View All Plans
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handlePlanNavigation('/plans/recruiter')} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Upgrade Plan
                      </button>
                      <button 
                        onClick={() => handlePlanNavigation('/subscriptions')} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Manage Subscription
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/applications" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Applied Jobs
                </Link>
                <p className="text-gray-700">
                  Hi, {user.firstName}
                </p>
                <div className="border-l border-gray-300 pl-4">
                  <UserButton />
                </div>
              </div>
            ) : companyToken ? (
              <div className="flex items-center space-x-4">
                <p className="text-gray-700">
                  Welcome, {companyData?.name}
                </p>
                <div className="border-l border-gray-300 pl-4">
                  <button 
                    onClick={() => {
                      localStorage.removeItem('companyToken');
                      window.location.reload();
                    }}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowRecruiterLogin(true)} 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Recruiter Login
                </button>
                <button 
                  onClick={() => openSignIn()} 
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
