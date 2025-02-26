import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ApplyJob from './pages/ApplyJob';
import Home from './pages/Home';
import Application from './pages/Application';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Application />} />        
      </Routes>
    </div>
  )
}

export default App;
