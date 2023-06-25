import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import KanbanCard from '../blocks/Card';
import AddCardButton from '../blocks/AddCardButton';
import BoardSideMenu from '../blocks/BoardSideMenu';
import BoardUsersList from '../blocks/BoardUsersList';
import AddUserButton from '../blocks/AddUserButton';
import EditBoardButton from '../blocks/EditBoardButton';
import DeleteBoardButton from '../blocks/DeleteBoardButton';

export default function KanbanBoard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <BoardSideMenu />

      {/* Kanban Board */}
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        {/* Cabeçalho */}
        <Grid component='main' container spacing={4} sx={{ p: 4 }}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant='h4' component='h1' sx={{ pr: 4 }}>Nome do Board</Typography>
              <DeleteBoardButton />
              <EditBoardButton />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <BoardUsersList />
              <AddUserButton />
            </Stack>
          </Grid>          
          {/* Coluna 1 */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ bgcolor: 'error.light', py: 0.5 }} elevation={1}>
              <Typography variant='subtitle2' align='center' color='white'>
                PENDENTE
              </Typography>
            </Paper>
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
            <Grid container justifyContent='center' sx={{ pt: 2 }}>
              <AddCardButton />
            </Grid>
          </Grid>
          {/* Coluna 2 */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ bgcolor: 'warning.light', py: 0.5 }} elevation={1}>
              <Typography variant='subtitle2' align='center' color='white'>
                EM ANDAMENTO
              </Typography>
            </Paper>
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
          </Grid>
          {/* Coluna 3 */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ bgcolor: 'info.light', py: 0.5 }} elevation={1}>
              <Typography variant='subtitle2' align='center' color='white'>
                REVISANDO
              </Typography>
            </Paper>
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
          </Grid>
          {/* Coluna 4 */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ bgcolor: 'success.light', py: 0.5 }} elevation={1}>
              <Typography variant='subtitle2' align='center' color='white'>
                FINALIZADO
              </Typography>
            </Paper>
            <KanbanCard />
            <KanbanCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
