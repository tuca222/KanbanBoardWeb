import { createUserController } from "../Application/UseCases/CreateUser";

require('dotenv').config();
const express = require('express');
const cors = require("cors");
const session = require('express-session')
import { router } from './routes';

//APP EXPRESS
const app = express();

//CONFIGURANDO MIDDLEWARES
app.use(cors({ credentials: true, origin: true }));
app.use(session({
  secret: 'minhasenha1234!',
  saveUninitialized:true,
  cookie: { 
    sameSite: 'strict',
    maxAge: 3600*1000,
    authenticated: false
  },
  resave: false
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(router)

export { app };