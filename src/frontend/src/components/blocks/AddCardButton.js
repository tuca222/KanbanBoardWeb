import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import QueueIcon from '@mui/icons-material/Queue';
import Tooltip from '@mui/material/Tooltip';

export default function AddCardButton({ onCardAdd }) {
  return (
    <React.Fragment>
      <Tooltip title="Adicionar Tarefa">
        <IconButton onClick={onCardAdd} aria-label="Adicionar tarefa" >
          <QueueIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}