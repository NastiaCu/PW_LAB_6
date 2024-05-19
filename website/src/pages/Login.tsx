import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios'; 

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(username, password); 
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
      <Typography variant="h4">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
