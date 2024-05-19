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
  Paper,
  Box,
} from '@mui/material';

interface CalorieLog {
  id: number;
  date: string;
  food_item: string;
  calories: number;
}

const CalorieTrackerPage: React.FC = () => {
  const { token, logout } = useAuth();
  const [calorieLogs, setCalorieLogs] = useState<CalorieLog[]>([]);
  const [totalCaloriesToday, setTotalCaloriesToday] = useState<number>(0);
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
      calculateTotalCalories(response.data);
    } catch (err) {
      setError('Failed to load calorie logs');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCalories = (logs: CalorieLog[]) => {
    const today = new Date().toISOString().split('T')[0];
    const filteredLogs = logs.filter(log => log.date === today);
    const totalCalories = filteredLogs.reduce((total, log) => total + log.calories, 0);
    setTotalCaloriesToday(totalCalories);
  };

  const handleAddCalorieLog = async () => {
    const today = new Date().toISOString().split('T')[0];
    const foodItem = prompt('Enter food description for today:');
    const calories = prompt('Enter calories consumed for today:');
    if (foodItem !== null && calories !== null) {
      try {
        setLoading(true);
        setError(null);
        await createCalorieLog(token!, {
          date: today,
          food_item: foodItem,
          calories: parseFloat(calories)
        });
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
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px', borderRadius:'10px' }}>
          <Typography variant="h4" gutterBottom>
            Calorie Tracker
          </Typography>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          <Button onClick={handleAddCalorieLog} color="primary">
            Add Calorie Log
          </Button>
          <Typography variant="h6">Total Calories Today: {totalCaloriesToday}</Typography>
          <List>
            {calorieLogs.map((log) => (
              <ListItem key={log.id}>
                <ListItemText
                  primary={`Date: ${log.date}`}
                  secondary={`Food: ${log.food_item}, Calories: ${log.calories}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default CalorieTrackerPage;



