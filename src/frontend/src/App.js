import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/pages/Home';

//import KanbanBoard from './components/layouts/KanbanBoard';
// <KanbanBoard />

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
};

export default App;
