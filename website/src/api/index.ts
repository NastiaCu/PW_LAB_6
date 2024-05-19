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

export const createCalorieLog = (token: string, calorieLogData: any) => api.post('/calorie-logs/', calorieLogData, {
  headers: { Authorization: `Bearer ${token}` }
});

export const getCalorieLogs = (token: string, date: string) => api.get(`/calorie-logs/${date}`, {
  headers: { Authorization: `Bearer ${token}` }
});
