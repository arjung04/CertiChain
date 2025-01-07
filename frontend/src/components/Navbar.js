import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CertiChain
        </Typography>
        <Box>
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
