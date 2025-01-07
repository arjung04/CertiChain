import React, { useState } from 'react';

const UploadCertificate = () => {
  const [formData, setFormData] = useState({
    owner: '',
    institution: '',
    certificate: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(null); // Error message
  const [successMessage, setSuccessMessage] = useState(null); // Success message

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setErrorMessage(null); // Reset error message
    setSuccessMessage(null); // Reset success message

    try {
      // Log formData for debugging
      console.log('Submitting form data:', formData);

      // Make API request
      const response = await fetch('http://localhost:5000/add_certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage(data.message); // Display success message
    } catch (error) {
      console.error('Error uploading certificate:', error);
      setErrorMessage('Failed to upload certificate. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h2>Upload Certificate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="owner"
          placeholder="Owner"
          value={formData.owner}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="institution"
          placeholder="Institution"
          value={formData.institution}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="certificate"
          placeholder="Certificate"
          value={formData.certificate}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Certificate'}
        </button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default UploadCertificate;
