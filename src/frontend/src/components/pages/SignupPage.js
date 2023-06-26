import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import SignupForm from '../blocks/SignupForm';
import LoginBackground from '../blocks/LoginBackground';

export default function Login() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <LoginBackground />
      <SignupForm />
    </Grid>
  );
}
