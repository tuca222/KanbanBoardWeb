import { response } from "express";
import { createUserController } from "../Application/UseCases/CreateUser";
import { loginUserController } from "../Application/UseCases/LoginUser";
const {Router} = require('express');
const router = Router();
import {authenticated}  from "./utils/authenticated";

//----------ROTAS----------

//rota publica (Bem vindo)
router.get('/', (request, response) => {
  if (request.session.authenticated) {
    response.status(200).json({msg: 'Parabéns usuário já autenticado!'});
  };
  return response.status(200).json({msg: "Bem vindo a API - Esta rota é publica!"})
});

//rota login
router.post('/login', (request, response) => {
  if (request.session.authenticated) {
    return response.status(200).json({msg: 'Usuário já está autenticado!'});
  };
  loginUserController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: Error.message});
  });
});

//----------ROTAS USERS----------
//rota publica (cadastro de usuario)
router.post('/users', (request, response) => {
  const verifica = request.session.authenticated;
  console.log(verifica);
  if (verifica){
    console.log('entrou na verificacao')
    response.status(200).json({authenticated: true});
  }
  else {
    createUserController.handle(request, response).then(() =>{
    console.log(request.session.authenticated);
    console.log('autenticou');
    }).catch((Error) => {
      console.log('erro de registro')
      response.status(422).json({msg: Error.message});
    });
  }
});

//rota privada (Logout)
router.get('/users/logout', (request, response) => {
  request.session.destroy();
  return response.status(200).json({msg: 'Saindo dessa conta!'})
});

//rota privada (ReadUser) - página inicial do usuário
router.get('/users', authenticated, (request, response) => {
  response.status(200).json({user: "usuario"});
});

//rota privada (teste)
router.get('/private', (request, response) => {
  if (request.session.authenticated) {
    return response.status(200).json({msg: 'Parabéns usuário autenticado!'});
  };
  response.status(401).json({msg: 'Autenticação negada, faça seu login!'});
});

export {router}