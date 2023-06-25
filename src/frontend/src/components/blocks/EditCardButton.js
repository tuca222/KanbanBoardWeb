import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';

export default function EditCardButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Editar Tarefa">
        <IconButton onClick={handleClickOpen} aria-label="Editar Tarefa" >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>Editar Tarefa</DialogTitle>
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
          <Button type='submit' onClick={handleClose}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}