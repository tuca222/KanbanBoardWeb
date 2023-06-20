import { Request, Response } from "express";
import { ICreateUserUseCase } from "../Interfaces/ICreateUserUseCase";

export class CreateUserController {
  constructor(
    private createUserUseCase: ICreateUserUseCase
  ) {}

  async handle(request, response): Promise<Response> {
    try{  
      const {userName, email, senha, senhaConfirmada} = request.body;
      if (!userName){
        return response.status(422).json({msg: 'O nome de usuário é obrigatório!'});
      };
      if (!email){
        return response.status(422).json({msg: 'O email é obrigatório!'});
      };
      if (!senha){
        return response.status(422).json({msg: 'A senha é obrigatória!'});
      };
      if (senha != senhaConfirmada){
        return response.status(422).json({msg: 'As senhas não coincidem!'});
      };

      await this.createUserUseCase.execute({
        userName,
        email,
        senha,
      });
      request.session.authenticated = true;
      return response.status(201).json({msg: "Usuário criado com sucesso!"});
    } catch (Error) {
      throw Error;
    };
  }
}