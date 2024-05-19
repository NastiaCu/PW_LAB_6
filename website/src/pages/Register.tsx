import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Register: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user');  
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', {
        username,
        password,
        email,
        full_name: fullName,
        role,
      });
      if (response.data && response.data.access_token) {
        await login(username, password);
      } else {
        throw new Error('Invalid response from server');
      }
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
      <Typography variant="h4">Register</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth required>
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
    </Container>
  );
};

export default Register;
