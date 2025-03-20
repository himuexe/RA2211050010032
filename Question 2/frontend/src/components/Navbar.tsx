import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" flexGrow={1}>
          Social Media Analytics
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Top Users
        </Button>
        <Button color="inherit" component={Link} to="/trending">
          Trending Posts
        </Button>
        <Button color="inherit" component={Link} to="/feed">
          Feed
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;