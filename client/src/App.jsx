import React, { useContext, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ApplyJob from './pages/ApplyJob';
import Home from './pages/Home';
import Application from './pages/Application';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';
import ViewApplications from './pages/ViewApplications';
import JobSeekerPlan from './pages/JobSeekerPlan';
import RecruiterPlan from './pages/RecruiterPlan';
import SubscriptionPlans from './components/SubscriptionPlans';
import 'quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';

// Protected Route component for plan access
const ProtectedPlanRoute = ({ element: Element, userType, ...rest }) => {
  const { companyToken, user } = useContext(AppContext);
  
  // Allow access to plan pages regardless of user type
  // The plan pages themselves will handle the appropriate redirection
  return <Element {...rest} />;
};

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Application />} />
        <Route 
          path="/plans/job-seeker" 
          element={<JobSeekerPlan />} 
        />
        <Route 
          path="/plans/recruiter" 
          element={<RecruiterPlan />} 
        />
        <Route path="/subscriptions" element={<SubscriptionPlans />} />
        <Route path="/dashboard" element={companyToken ? <Dashboard /> : <Home />}>
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
