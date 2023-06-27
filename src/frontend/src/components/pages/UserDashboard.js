import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import BoardsSideMenu from '../blocks/BoardsSideMenu';
import KanbanBoard from '../blocks/KanbanBoard';

export default function UserDashboard() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <BoardsSideMenu />
      <KanbanBoard />
    </Grid>
  );
}
