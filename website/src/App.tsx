import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './hooks/useAuth';
import { useTheme, ThemeProvider } from './hooks/useTheme';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </MuiThemeProvider>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default AppWrapper;
