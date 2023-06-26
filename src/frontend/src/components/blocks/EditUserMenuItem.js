import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


export default function EditUserMenuItem() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ListItemButton sx={{ pl: 9 }} onClick={handleClickOpen}>        
        <ListItemText primary='Editar Conta' />
      </ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>Editar dados da Conta:</DialogTitle>
        <DialogContent>
          <TextField
            id="userName"
            label="Nome do Usuário"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            size="small"
          />
          <TextField
            id="loginSenha"
            label="Nova Senha"
            type="password"
            margin="dense"            
            fullWidth
            variant='standard'            
            autoComplete="senha"
          />
          <TextField
            id="loginSenhaConfirma"
            label="Confirmar Nova Senha"
            type="password"
            margin="dense"            
            fullWidth
            variant='standard'            
            autoComplete="senha"
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