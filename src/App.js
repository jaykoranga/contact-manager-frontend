import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import {Register} from './Components/register.js';
import Login from './Components/Login.js';
import Dashboard from './Components/dashboard.js';
function App(){
  return(
        <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App;
