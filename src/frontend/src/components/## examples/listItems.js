import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const boardPrivateItems = (
  <ListItemButton>
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText
      primary="Board Exemplo"
      primaryTypographyProps={{ noWrap: true }}
    />
  </ListItemButton>
);
