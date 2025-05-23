// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import { Link } from 'react-router-dom'; // For navigation links

const Header = () => {
  return (
    // AppBar is Material-UI's component for the application bar
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Application Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          MagicFrames
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/"> {/* Assuming Create a Frame is the home page for now */}
            Create a Frame
          </Button>
          <Button color="inherit" component={Link} to="/"> {/* Placeholder for Order History */}
            Order History
          </Button>
        </Box>

        {/* User Profile / Avatar */}
        <IconButton sx={{ ml: 2 }}>
          {/* Replace with actual user avatar or icon */}
          <Avatar alt="User" src="https://placehold.co/40x40/aabbcc/ffffff?text=U" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;