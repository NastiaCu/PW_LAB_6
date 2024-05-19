import React, { useState, useEffect } from 'react';
import { Typography, Container, Paper, Box, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
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
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

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

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        setError('Failed to fetch users');
      }
    };

    if (token) {
      fetchUserProfile();
      fetchAllUsers();
    }
  }, [token]);

  const handleDeleteUser = async (userId: number) => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:8000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.delete('http://localhost:8000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUsers([]);
      } else {
        throw new Error('Failed to delete all users');
      }
    } catch (error) {
      setError('Failed to delete all users');
    } finally {
      setLoading(false);
    }
  };

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
              {userProfile.role === 'admin' && (
                <>
                  <Typography variant="h6">Manage Users:</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteAllUsers}
                    style={{ marginBottom: '10px', background:"#EB4848" }}
                  >
                    Delete All Users
                  </Button>
                  {loading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Typography color="error">{error}</Typography>
                  ) : (
                    <List>
                      {users.map((user: any) => (
                        <ListItem key={user.id}>
                          <ListItemText primary={user.username} />
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteUser(user.id)}
                            style={{ background:"#EB4848" }}
                          >
                            Delete
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </>
              )}
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
