import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../examples/listItems';
import KanbanCard from '../blocks/KanbanCard';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const ExpandDrawer = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)"
}));

export default function KanbanBoard() {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <ExpandDrawer
            expand={expanded}
            onClick={() => { handleExpandClick(); toggleDrawer(); }}
            aria-expanded={expanded}
            aria-label="expandir card">
            <ChevronLeftIcon />
          </ExpandDrawer>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Grid container spacing={4} sx={{ p: 4 }}>
          
          {/* Coluna 1 */}
          <Grid item spacing={2} xs={12} md={6} lg={3}>
            <Typography variant="h5">
              A Fazer
            </Typography>
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
          </Grid>
          {/* Coluna 2 */}
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h5">
              Em Andamento
            </Typography>
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
          </Grid>
          {/* Coluna 3 */}
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h5">
              Testando
            </Typography>
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
          </Grid>
          {/* Coluna 4 */}
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h5">
              Finalizado
            </Typography>
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
