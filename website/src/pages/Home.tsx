import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getCalorieLogs, createCalorieLog } from '../api';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '../hooks/useTheme';

interface CalorieLog {
  id: number;
  logged_date: string;
  calories_consumed: number;
}

const CalorieTrackerPage: React.FC = () => {
  const { token, logout } = useAuth();
  const { toggleTheme } = useTheme();
  const [calorieLogs, setCalorieLogs] = useState<CalorieLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      loadCalorieLogs();
    }
  }, [token]);

  const loadCalorieLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await getCalorieLogs(token!, today);
      setCalorieLogs(response.data);
    } catch (err) {
      setError('Failed to load calorie logs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCalorieLog = async () => {
    const today = new Date().toISOString().split('T')[0];
    const caloriesConsumed = prompt('Enter calories consumed for today:');
    if (caloriesConsumed !== null) {
      try {
        setLoading(true);
        setError(null);
        await createCalorieLog(token!, { logged_date: today, calories_consumed: parseFloat(caloriesConsumed) });
        await loadCalorieLogs();
      } catch (err) {
        setError('Failed to add calorie log');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Calorie Tracker</Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      <Button onClick={logout} color="secondary">
        Logout
      </Button>
      <Button onClick={handleAddCalorieLog} color="primary">
        Add Calorie Log
      </Button>
      <List>
        {calorieLogs.map((log) => (
          <ListItem key={log.id}>
            <ListItemText
              primary={`Date: ${log.logged_date}`}
              secondary={`Calories: ${log.calories_consumed}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CalorieTrackerPage;
