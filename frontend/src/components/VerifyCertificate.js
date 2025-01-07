import React, { useState } from 'react';

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleChange = (e) => {
    setCertificateId(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!certificateId) {
      alert('Please enter a certificate ID.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/chain');
      const data = await response.json();

      const certificate = data.chain
        .flatMap((block) => block.data)
        .find((record) => record.certificate === certificateId);

      if (certificate) {
        setVerificationResult({
          status: 'Valid',
          owner: certificate.owner,
          institution: certificate.institution,
        });
      } else {
        setVerificationResult({ status: 'Invalid' });
      }
    } catch (error) {
      console.error('Error verifying certificate:', error);
      alert('Error verifying the certificate. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Verify Certificate</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certificateId}
          onChange={handleChange}
          required
        />
        <button type="submit">Verify</button>
      </form>

      {verificationResult && (
        <div>
          <h3>Verification Result</h3>
          {verificationResult.status === 'Valid' ? (
            <p>
              <strong>Status:</strong> {verificationResult.status} <br />
              <strong>Owner:</strong> {verificationResult.owner} <br />
              <strong>Institution:</strong> {verificationResult.institution}
            </p>
          ) : (
            <p><strong>Status:</strong> {verificationResult.status}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
