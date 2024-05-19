import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios, { AxiosError } from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(username, password);
      navigate('/');
      console.log('Logged in successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ detail: string }>;
        setError(axiosError.response?.data?.detail ?? 'Failed to login. Please try again.');
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};


export default Login;
