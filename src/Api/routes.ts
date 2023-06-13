import { Router } from 'express';
import { createUserController } from '../Application/UseCases/CreateUser';

const router = Router();

router.get('/', (request, response) => {
  return response.status(200).json({msg: "Bem vindo a API"})
})

//rota cadastro de usuario
router.post('/users', (request, response) => {
  return createUserController.handle(request, response).then().catch();
});

export {router};