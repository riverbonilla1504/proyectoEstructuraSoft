import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Home from './home';
import UserDashboard from './userDashboard';
import UserWaitDashboard from './userWaitDashboard';
import AdminDashboard from './adminDashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='/userDashboard' element={<UserDashboard />} />
      <Route path='/userWaitDashboard' element={<UserWaitDashboard />} />
      <Route path='/adminDashboard' element={<AdminDashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
