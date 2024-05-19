import React, { useState, useEffect } from 'react';
import { Typography, Container, Paper, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

interface UserProfile {
  username: string;
  role: string;
  email: string;
}
const Profile: React.FC = () => {
  const { token } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUserProfile(response.data);
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <Container>
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          {loading ? (
            <Typography variant="body1">Loading user profile...</Typography>
          ) : userProfile ? (
            <>
              <Typography variant="body1">Username: {userProfile.username}</Typography>
              <Typography variant="body1">Role: {userProfile.role}</Typography>
              <Typography variant="body1">Email: {userProfile.email}</Typography>
            </>
          ) : (
            <Typography variant="body1">No user profile available</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
