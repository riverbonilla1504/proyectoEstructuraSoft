import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
