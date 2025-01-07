import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>
          CertiChain
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start', // Align items to the left
            flexGrow: 1,
            gap: 2, // Spacing between buttons
            ml: '10%', // Add left margin to position the tabs slightly left
          }}
        >
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/upload" color="inherit">
            Upload
          </Button>
          <Button component={Link} to="/verify" color="inherit">
            Verify
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
