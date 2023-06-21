import { createUserController } from "../Application/UseCases/CreateUser";
import { loginUserController } from "../Application/UseCases/LoginUser";
import { readUserController } from "../Application/UseCases/ReadUser";

const {Router} = require('express');
const router = Router();
import {authenticated}  from "./utils/authenticated";

//----------ROTAS----------

//rota inicial do backend (Com este resultado o front 
//                         redireciona para pagina de login ou  
//                         para pagina inicial do usuario)
router.get('/', (request, response) => {
  if (request.session.authenticated) {
    return response.status(202).json({authenticated: true});
  };
  return response.status(202).json({authenticated: false})
});

//rota login
router.post('/login', (request, response) => {
  if (request.session.authenticated) {
    return response.status(202).json({authenticated: true});
  };
  loginUserController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro no login: ' + Error.message});
  });
});


//----------ROTAS USERS----------
//rota publica (cadastro de usuario)

//HTTP POST USER
router.post('/users', (request, response) => {  
  if (request.session.authenticated){
    return response.status(202).json({authenticated: true});
  }
  else {
    createUserController.handle(request, response).catch((Error) => {
      return response.status(400).json({msg: 'Erro no cadastro: ' + Error.message});
    });
  }
});

//HTTP GET USER
//rota privada (ReadUser) - página inicial do usuário
router.get('/users/:id', authenticated, (request, response) => {
  const {id} = request.params.id;
  console.log(id)
  readUserController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro em buscar as informações do usuário: ' + Error.message});
  });
});

//rota privada (Logout)
router.get('/users/logout', authenticated, (request, response) => {
  try{
    request.session.destroy();
    return response.status(200).json({msg: 'Sessão do usuário encerrada!'})
  } catch (Error){
    return response.status(400).json({msg: 'Erro ao encerrar sessão do usuário!'})
  }
});

//rota privada (teste)
router.get('/private', (request, response) => {
  if (request.session.authenticated) {
    return response.status(202).json({authenticated: true});
  };
  response.status(401).json({authenticated: false});
});

export {router}