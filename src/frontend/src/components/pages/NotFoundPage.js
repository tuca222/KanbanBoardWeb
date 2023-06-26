import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import NotFound from '../blocks/NotFound';
import LoginBackground from '../blocks/LoginBackground';

export default function Login() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <LoginBackground />
      <NotFound />
    </Grid>
  );
}
