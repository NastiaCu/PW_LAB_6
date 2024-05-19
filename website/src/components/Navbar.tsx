import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Calorie Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <IconButton color="inherit" onClick={toggleTheme} style={{ marginRight: '10px' }}>
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <ModeNightIcon />}
        </IconButton>

        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
