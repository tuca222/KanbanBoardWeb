import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import SignupPage from './components/pages/SignupPage';
import NotFoundPage from './components/pages/NotFoundPage';
import KanbanBoard from './components/pages/KanbanBoard';

const appTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/SignupForm" element={<SignupPage />} />
        <Route path="/users/:userId/boards/" element={<KanbanBoard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
