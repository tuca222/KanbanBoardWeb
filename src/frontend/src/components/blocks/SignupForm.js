import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { grey } from '@mui/material/colors';


export default function SignupForm() {

  // Schema dos dados do formulário
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('O nome de usuário é obrigatório'),
    email: Yup.string().email('Email inválido').required('O email é obrigatório'),
    senha: Yup.string().required('A senha é obrigatória'),
    senhaConfirmada: Yup.string()
      .oneOf([Yup.ref('senha'), null], 'As senhas não coincidem')
      .required('A confirmação de senha é obrigatória'),
  });

  const servidor = 'http://projetofinal.jacqueline.c.beber.vms.ufsc.br:8080' // Define a porta do servidor
  const navigate = useNavigate(); // Navegação usando react
  const iconColor = grey[800]; // Cor do ícone

  // Função de callback quando o usuário clica em 'entrar'
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Enviar request ao servidor
      const response = await axios.post(`${servidor}/users/`, values);
      console.log(response.data);

      // Redirecionar para a rota certa (userId)
      navigate(`/users/${response.data.userId}/boards/`);
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <Grid item sm={12} md={6} xl={4} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: iconColor }}>
          <DashboardIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Criar conta no App KanbanBoard
        </Typography>
        <Formik
          initialValues={{
            user: '',
            email: '',
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
                margin="normal"
                required
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
                margin="normal"
                required
                fullWidth
                id="loginEmail"
                label="Email"
                name="email"
                autoComplete="email"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <Field
                as={TextField}
                margin="normal"
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
                margin="normal"
                fullWidth
                id="loginConfirmarSenha"
                label="Repita a senha *"
                type="password"
                name="senhaConfirmada"
                autoComplete="confirmar-senha"
                error={touched.confirmarSenha && !!errors.confirmarSenha}
                helperText={touched.confirmarSenha && errors.confirmarSenha}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar-se
              </Button>

              <Grid container>
                <Grid item>
                  <Link to="/">Voltar para tela principal</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};
