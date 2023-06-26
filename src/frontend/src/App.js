import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Route, Router } from 'react-router-dom';
import SignupPage from './components/pages/SignupPage';
import NotFoundPage from './components/pages/NotFoundPage';
import KanbanBoard from './components/pages/KanbanBoard';
import Home from './components/pages/Redirect'
import Login from './components/pages/Login'


const appTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId/boards" component={KanbanBoard} />
      </Router>


      {/* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/SignupForm" element={<SignupPage />} />
        <Route path="/users/:userId/boards/" element={<KanbanBoard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes> */}
    </ThemeProvider>
  );
};

export default App;
