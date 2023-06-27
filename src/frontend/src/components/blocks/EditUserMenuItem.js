import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


export default function EditUserMenuItem() {

  // Schema dos dados do formulário
  const validationSchema = Yup.object().shape({
    userName: Yup.string(),
    senha: Yup.string(),
    senhaConfirmada: Yup.string()
      .oneOf([Yup.ref('senha'), null], 'As senhas não coincidem')
      .required('A confirmação de senha é obrigatória'),
  });

  const [open, setOpen] = React.useState(false);
  const servidor = 'http://localhost:3333' // Define a porta do servidor
  const navigate = useNavigate(); // Navegação usando react  
  let { userId } = useParams();

  // Função de callback quando o usuário clica em 'entrar'
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Enviar request ao servidor
      const response = await axios.patch(`${servidor}/users/${userId}`, values);
      console.log(response.data);

      // Redirecionar para a rota certa (userId)
      navigate(`/users/${response.data.userId}/boards/`);
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

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
        <DialogTitle sx={{ pb: 0 }}>Inserir novos dados da conta:</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              user: '',              
              senha: '',
              confirmarSenha: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  margin="dense"
                  variant="standard"
                  fullWidth
                  id="loginUser"
                  label="Nome de Usuário"
                  name="userName"
                  autoComplete="user"
                  error={touched.user && !!errors.user}
                  helperText={touched.user && errors.user}
                />
                <Field
                  as={TextField}
                  margin="dense"
                  variant="standard"
                  fullWidth
                  id="loginSenha"
                  label="Senha *"
                  type="password"
                  name="senha"
                  autoComplete="senha"
                  error={touched.senha && !!errors.senha}
                  helperText={touched.senha && errors.senha}
                />
                <Field
                  as={TextField}
                  margin="dense"
                  variant="standard"
                  fullWidth
                  id="loginConfirmarSenha"
                  label="Repita a senha *"
                  type="password"
                  name="senhaConfirmada"
                  autoComplete="confirmar-senha"
                  error={touched.confirmarSenha && !!errors.confirmarSenha}
                  helperText={touched.confirmarSenha && errors.confirmarSenha}
                />
                <DialogActions
                  sx={{ pt: 2, float: 'right' }}
                  direction="row"
                  spacing={3}
                >
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleClose}
                  >
                    Confirmar
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}