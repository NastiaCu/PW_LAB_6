import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#48EBA6', 
    },
    background: {
      default: '#FBF9E8',
    },
    text: {
      primary: '#333333',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#48EBA6',
    },
    background: {
      default: '#121212', 
      paper: '#1E1E1E', 
    },
    text: {
      primary: '#FFFFFF', 
      secondary: '#CCCCCC', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
  },
});
