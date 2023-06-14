require('dotenv').config();
const express = require('express');
const cors = require("cors");
const session = require('express-session')
import { createUserController } from '../Application/UseCases/CreateUser';
import { router } from './routes';

//APP EXPRESS
const app = express();

//CONFIGURANDO MIDDLEWARES
app.use(cors({ credentials: true, origin: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized:true,
  cookie: { expires: new Date(Date.now() + (3600*1000)), maxAge: 3600*1000 },
  resave: false
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(router);


export { app };