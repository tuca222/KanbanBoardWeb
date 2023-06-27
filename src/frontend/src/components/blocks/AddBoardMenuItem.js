import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';


export default function AddBoardMenuItem() {
  // Schema dos dados do formulário
  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("O nome é obrigatório"),
  });

  const [open, setOpen] = React.useState(false);
  const servidor = 'http://localhost:3333' // Define a porta do servidor
  const navigate = useNavigate(); // Navegação usando react  
  let { userId } = useParams();

  // Função de callback quando o usuário clica em 'entrar'
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Enviar request ao servidor
      const response = await axios.post(`${servidor}/users/${userId}/boards`, values);
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
      <ListItemButton sx={{ mb: 1 }} onClick={handleClickOpen}>
        <ListItemIcon>
          <DashboardCustomizeIcon />
        </ListItemIcon>
        <ListItemText primary='Adicionar Board' />
      </ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>Adicionar Novo Board</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              titulo: '',
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
                  id="titulo"
                  label="Nome do Board"
                  name="titulo"
                  autoComplete="titulo"
                  error={touched.user && !!errors.user}
                  helperText={touched.user && errors.user}
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