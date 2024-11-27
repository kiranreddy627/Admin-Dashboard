import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Make sure to import your Login component
import Signup from './components/Signup'; // Import your Signup component, if needed
import AdminDashboard from './components/Admindashboard';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />  
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<AdminDashboard />} />
      
      </Routes>
    </Router>
  );
}

export default App;
