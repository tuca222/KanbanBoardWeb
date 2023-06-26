import { request, response } from "express";

const {Router} = require('express');
const router = Router();
import {authenticated}  from "./utils/authenticated";
import { createUserController } from "../Application/UseCases/User/CreateUser";
import { deleteUserController } from "../Application/UseCases/User/DeleteUser";
import { loginUserController } from "../Application/UseCases/User/LoginUser";
import { readUserController } from "../Application/UseCases/User/ReadUser";
import { updateUserController } from "../Application/UseCases/User/UpdateUser";
import { getAllBoardsController } from "../Application/UseCases/Board/GetAllBoards";
import { createBoardController } from "../Application/UseCases/Board/CreateBoard";
import { readBoardController } from "../Application/UseCases/Board/ReadBoard";
import { shareBoardController } from "../Application/UseCases/Board/ShareBoard";
import { createCardController } from "../Application/UseCases/Card/CreateCard";
import { readCardController } from "../Application/UseCases/Card/ReadCard";
import { updateCardController } from "../Application/UseCases/Card/UpdateCard";




//----------ROTAS----------

//rota inicial do backend (Com este resultado o front 
//                         redireciona para pagina de login ou  
//                         para pagina inicial do usuario)
router.get('/', (request, response) => {
  if (request.session.authenticated) {
    return response.status(202).json({authenticated: true, msg: "Página Inicial do User"});
  };
  return response.status(202).json({authenticated: false, msg: "Página Login"});
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
  };
});

//HTTP GET USER
//rota privada (ReadUser) - página inicial do usuário
router.get('/users/:id', authenticated, (request, response) => {
  readUserController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro em buscar as informações do usuário: ' + Error.message});
  });
});

//HTTP PATCH USER
router.patch('/users/:id', authenticated, (request, response) => {
  updateUserController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Errro ao atualizar os dados do usuário: ' + Error.message});
  });
});

//HTTP DELETE USER
router.delete('/users/:id', authenticated, (request, response) => {
  deleteUserController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro em excluir usuário: ' + Error.message});
  });
});

//rota privada (Logout)
router.get('/logout', authenticated, (request, response) => {
  try{
    request.session.destroy();
    return response.status(200).json({msg: 'Sessão do usuário encerrada!'})
  } catch (Error){
    return response.status(400).json({msg: 'Erro ao encerrar sessão do usuário!'})
  };
});

//rota privada (teste)
router.get('/private', (request, response) => {
  if (request.session.authenticated) {
    return response.status(202).json({authenticated: true});
  };
  response.status(401).json({authenticated: false});
});


//----------ROTAS Boards----------
// HTTP GET ALL BOARDS 
router.get('/users/:id/boards',authenticated, (request, response) => {
  getAllBoardsController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro na leitura dos Boards ' + Error.message})
  })
})

// HTTP GET BOARD -- READ BOARD
router.get('/users/:userId/boards/:boardId', authenticated, (request, response) => {
  readBoardController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro na leitura do Board: ' + Error.message})
  })
})

// HTTP POST BOARD
router.post('/users/:id/boards', authenticated, (request, response) => {
  createBoardController.handle(request,response).catch((Error)  => {
    return response.status(400).json({msg: 'Erro na criação do Board: ' + Error.message});
  });
});

// HTTP UPDATE BOARD
// router.patch('/users/:userId/boards/:boardId', authenticated, (request, response) => {
// updateBoardController.handle(request, response).catch((Error) => {
//  return response.status(400).json({msg: 'Erro ao atualizar Board: ' + Error.message});
//});
//});

// HTTP SHARE BOARD ---- COMPARTILHAR
router.post('/users/:userId/boards/:boardId/share', authenticated, (request, response) => {
  shareBoardController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro ao compartilhar Board: ' + Error.message});
  });
});

// HTTP EDITORES BOARD -- Quem possui acesso ao Board

// HTTP DELETE BOARD
// router.delete('/users/:userId/boards/:boardId', authenticated, (request, response) => {
// deleteBoardController.handle(request, response).catch((Error) => {
//  return response.status(400).json({msg: 'Erro ao deletar Board: ' + Error.message});
//});
//});


//----------ROTAS Cards----------
// HTTP POST CARD
router.post('/users/:userId/boards/:boardId/cards', authenticated, (request, response) => {
  createCardController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro em criar card: ' + Error.message});
  });
});

router.get('/users/:userId/boards/:boardId/cards/:cardId', authenticated, (request, response) => {
  readCardController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro em ler card: ' + Error.message});
  });
});

router.patch('/users/:userId/boards/:boardId/cards/:cardId', authenticated, (request, response) => {
  updateCardController.handle(request, response).catch((Error) => {
    return response.status(400).json({msg: 'Erro em alterar card: ' + Error.message});
  });
})


export {router}