import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import BeVolunteer from './Pages/BeVolunteer'; 
import ReportLostChild from './Pages/ReportLostChild'; // Import ReportLostChild component
import AddLostChild from './Pages/AddLostChild';
import Events from './Pages/Events';
import Donate from './Pages/Donate';
import Gallery from './Pages/Gallery';
import AdoptChild from './Pages/AdoptChild';
import Profile from './Pages/Profile';
import PoliceDashboard from './Pages/PoliceDashboard';
import FaceMatch from './Pages/FaceMatch';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Policedashboard" element={<PoliceDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/be-volunteer" element={<BeVolunteer />} />
        <Route path="/report-lost-child" element={<ReportLostChild />} />
        <Route path="/AddLostChild" element={<AddLostChild />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Donate" element={<Donate />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/AdoptChild" element={<AdoptChild />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/facematch" element={<FaceMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
