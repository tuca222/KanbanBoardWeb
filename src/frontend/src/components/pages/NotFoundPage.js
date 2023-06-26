import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import NotFound from '../blocks/NotFound';
import HomeBackground from '../blocks/HomeBackground';

export default function Home() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <HomeBackground />
      <NotFound />
    </Grid>
  );
}
