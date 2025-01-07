import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UploadCertificate from './components/UploadCertificate';
import VerifyCertificate from './components/VerifyCertificate';
import CertificateDashboard from './components/CertificateDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CertificateDashboard />} />
        <Route path="/upload" element={<UploadCertificate />} />
        <Route path="/verify" element={<VerifyCertificate />} />
      </Routes>
    </Router>
  );
}

export default App;
