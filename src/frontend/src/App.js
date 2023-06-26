import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import SignupForm from './components/pages/SignupForm';
import LoginForm from './components/pages/LoginForm';
import NotFoundPage from './components/pages/NotFoundPage';
//import KanbanBoard from './components/layouts/KanbanBoard';


const lightTheme = createTheme({
//import KanbanBoard from './components/old/KanbanBoard';
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
          <Route path="/" element= {<Home />} />
          <Route path="/SignupForm" element= {<SignupForm />} />
          <Route path="/LoginForm" element= {<LoginForm />} />
          <Route path="*" element= {<NotFoundPage />} />
        </Routes>
    </ThemeProvider>
  );
};

export default App;
