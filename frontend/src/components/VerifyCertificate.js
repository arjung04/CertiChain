import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';

const VerifyCertificate = () => {
  const [certificateID, setCertificateID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`http://localhost:5000/verify_certificate?certificate=${certificateID}`);
      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      setResult(data.valid ? 'Certificate is valid!' : 'Certificate is invalid.');
    } catch (error) {
      setResult('Error verifying certificate. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: 'auto',
        mt: 5,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        Verify Certificate
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Certificate ID"
          value={certificateID}
          onChange={(e) => setCertificateID(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify Certificate'}
        </Button>
      </form>

      {result && (
        <Alert severity={result.includes('valid') ? 'success' : 'error'} sx={{ mt: 2 }}>
          {result}
        </Alert>
      )}
    </Box>
  );
};

export default VerifyCertificate;
