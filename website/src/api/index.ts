import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const registerUser = (userData: any) => api.post('/register', userData);
export const loginUser = (credentials: any) => api.post('/token', credentials);
export const getUsers = (token: string) => api.get('/users', {
  headers: { Authorization: `Bearer ${token}` }
});

export const deleteUser = (token: string) => api.delete('/users', {
  headers: { Authorization: `Bearer ${token}` }
});

export const getCalorieLogs = async (token: string, date: string) => {
  return await axios.get(`http://localhost:8000/calorie-logs/${date}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createCalorieLog = async (
  token: string,
  logData: { date: string; food_item: string; calories: number }
) => {
  return await axios.post('http://localhost:8000/calorie-logs/', logData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};