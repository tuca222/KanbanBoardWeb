import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import AddBoardMenuItem from './AddBoardMenuItem';
import EditUserMenuItem from './EditUserMenuItem';
import LogoutMenuItem from './LogoutMenuItem';


const servidor = 'http://localhost:3333'
const drawerWidth = 260;

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
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)'
}));

export default function BoardListMenuItem() {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [boardsOpen, setBoardsOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const [boardList, setBoardList] = React.useState([]);
  
  let { userId } = useParams();

  React.useEffect(() => {
    axios.get('/boards', { withCredentials: true })
      .then(response => {
        setBoardList(response.data.boards);
      })
      .catch(error => {
        console.error('Error fetching board list:', error);
      });
  }, []);

  return (
    <Drawer variant='permanent' open={drawerOpen}>
      <CssBaseline />
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <ExpandDrawer
          expand={drawerOpen}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <ChevronRightIcon />
        </ExpandDrawer>
      </Toolbar>
      <Divider />

      <List component='nav' >
        {/* Lista de Boards */}
        <ListItemButton onClick={() => setBoardsOpen(!boardsOpen)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary='Meus Boards' />
          {boardsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={boardsOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding dense>            
            {boardList.length === 0 ? (console.log("array vazio")) :
            boardList.map(board => (
              <ListItemButton key={board.id} sx={{ pl: 9 }}>
                <ListItemText
                  primary={board.tituloBoard}
                  primaryTypographyProps={{ noWrap: true }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <AddBoardMenuItem />
        {/* Usuário */}
        <Divider />
        <ListItemButton onClick={() => setUserOpen(!userOpen)} sx={{ mt: 1 }}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary='Nome do Usuário'
            primaryTypographyProps={{ noWrap: true }}
          />
          {userOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={userOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding dense>
            <EditUserMenuItem />
            <LogoutMenuItem />
          </List>
        </Collapse>
        <Divider sx={{ mt: 1 }} />
      </List>
    </Drawer>
  );
}