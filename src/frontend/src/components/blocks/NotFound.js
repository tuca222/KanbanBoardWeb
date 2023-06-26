import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const iconColor = grey[800];

const NotFoundPage = () => {

  return (
    <Grid item sm={12} md={6} xl={4} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: iconColor }}>
          <DashboardIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Projeto KanbanBoard
        </Typography>

        <Typography component="body" sx={{ mt: 4 }}>
          Página não encontrada!
        </Typography>
        <Grid container alignItems='center'>
          <Grid item>
            <Link to="/">Voltar à página inicial</Link>
          </Grid>
        </Grid>
      </Box >
    </Grid >
  );
};

export default NotFoundPage;
