import React, { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ApplyJob from './pages/ApplyJob';
import Home from './pages/Home';
import Application from './pages/Application';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import ManageJobs from './pages/ManageJobs';

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);
  return (
    <div>
      { showRecruiterLogin && <RecruiterLogin /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Application />} />        
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<Application />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
