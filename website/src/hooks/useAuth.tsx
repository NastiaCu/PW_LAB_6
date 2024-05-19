import { useState, useContext, createContext, ReactNode } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  // const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const response = await axios.post('http://localhost:8000/token', new URLSearchParams({
      username,
      password,
      grant_type: 'password'
    }));
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      setToken(response.data.access_token);
      setIsAuthenticated(true);
      // navigate('/');
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    // navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
