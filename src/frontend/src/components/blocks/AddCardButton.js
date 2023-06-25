import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import QueueIcon from '@mui/icons-material/Queue';
import Tooltip from '@mui/material/Tooltip';

export default function AddCardButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Adicionar Tarefa">
        <IconButton onClick={handleClickOpen} aria-label="Adicionar tarefa" >
          <QueueIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>Adicionar Tarefa</DialogTitle>
        <DialogContent>
          <TextField
            id="tarefaNome"
            label="Nome da Tarefa"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            size="small"
          />
          <TextField
            id="tarefaDescricao"
            label="Descrição"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            size="small"
          />
          <TextField
            id="tarefaConteudo"
            label="Conteúdo"
            type="text"
            margin="dense"
            fullWidth
            multiline
            maxRows={4}
            variant="standard"
            size="small"
          />
          <TextField
            id="tarefaDataPrazo"
            label="Data de Entrega"
            type="date"
            margin="dense"
            fullWidth
            multiline
            maxRows={4}
            variant="standard"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}