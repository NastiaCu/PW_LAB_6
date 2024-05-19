import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/register', {
        username,
        password,
        email,
        full_name: fullName,
        role,
      });
      navigate('/login');
      await login(username, password);
      console.log('Registered and logged in successfully');
    } catch (err) {
      console.error('Error during registration:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.detail || 'Registration failed. Please try again.');
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
          Register
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
          <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
          />
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as string)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
