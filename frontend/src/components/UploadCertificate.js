import React, { useState } from 'react';

const UploadCertificate = () => {
  const [formData, setFormData] = useState({
    owner: '',
    institution: '',
    certificate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/add_certificate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="owner" placeholder="Owner" onChange={handleChange} required />
      <input type="text" name="institution" placeholder="Institution" onChange={handleChange} required />
      <input type="text" name="certificate" placeholder="Certificate" onChange={handleChange} required />
      <button type="submit">Upload Certificate</button>
    </form>
  );
};

export default UploadCertificate;
