import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import Stack from "@mui/material/Stack";

export default function EditCardButton({ name, description, content, deadline, onFormConfirm }) {
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
          <Box
            component="form"
            autoComplete="off"
            onSubmit={onFormConfirm}
          >
            <TextField
              type="text"
              label="Nome da Tarefa"
              id="tarefaNome"
              name="tarefaNome"
              defaultValue={name}
              margin="normal"
              fullWidth
              variant="standard"
              size="small"
            />
            <TextField
              type="text"
              label="Descrição"
              id="tarefaDescricao"
              name="tarefaDescricao"
              defaultValue={description}
              margin="normal"
              fullWidth
              variant="standard"
              size="small"
            />
            <TextField
              type="text"
              label="Conteúdo"
              id="tarefaConteudo"
              name="tarefaConteudo"
              defaultValue={content}
              margin="normal"
              fullWidth
              multiline
              maxRows={4}
              variant="standard"
              size="small"
            />
            <TextField
              type="text"
              label="Data de Entrega"
              id="tarefaPrazo"
              name="tarefaPrazo"
              defaultValue={deadline}
              margin="normal"
              fullWidth
              variant="standard"
              size="small"
            />
          </Box>
          <Stack
            sx={{ pt: 2, float: 'right' }}
            direction="row"
            spacing={2}>
            <Button
              onClick={handleClose}
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleClose}
              type="submit"
              variant="contained"
            >
              Confirmar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </React.Fragment >
  );
}