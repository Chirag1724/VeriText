import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PlagiarismCheck from './pages/plagcheck';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<PlagiarismCheck />} />
      </Routes>
    </Router>
  );
}
