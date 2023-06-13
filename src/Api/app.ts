require('dotenv').config();
const express = require('express');
const cors = require("cors");
const session = require('express-session')
import { createUserController } from '../Application/UseCases/CreateUser';

//APP EXPRESS
const app = express();

//CONFIGURANDO MIDDLEWARES
app.use(cors({ credentials: true, origin: true }));
app.use(session({
  secret: process.env.SESSION_SECRET, //segredo usado para criptografar o cookie
  saveUninitialized:true, 
  cookie: { expires: new Date(Date.now() + (3600*1000)), maxAge: 3600*1000 }, //tempo de duração do cookie, em ms. 
  resave: false
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//----------ROTAS----------
//rota publica (Bem vindo)
app.get('/', (request, response) => {
  return response.status(200).json({msg: "Bem vindo a API"})
})

//rota publica (cadastro de usuario)
app.post('/users', (request, response) => {
  return createUserController.handle(request, response);
});

//rota privada (teste)

export { app };