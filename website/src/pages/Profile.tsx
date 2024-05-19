import React from 'react';
import { Typography, Container, Paper, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { token } = useAuth();

  return (
    <Container>
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Typography variant="body1">Token: {token}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
