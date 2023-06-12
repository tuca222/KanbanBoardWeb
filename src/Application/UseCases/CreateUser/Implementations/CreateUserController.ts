import { Request, Response } from "express";
import { ICreateUserUseCase } from "../Interfaces/ICreateUserUseCase";

export class CreateUserController {
  constructor(
    private createUserUseCase: ICreateUserUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {name, email, senha, senhaConfirmada} = request.body;
    if (!name){
      return response.status(422).json({msg: 'O nome é obrigatório!'});
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

    try{
      const responseUseCase = await this.createUserUseCase.execute({
        name, 
        email, 
        senha,
      });

      return responseUseCase
    } catch (Error) {
      return response.status(422).json({msg: 'Usuário ja existente'}) ||
             response.status(400).json({msg: 'Erro inesperado'});
    };
  }
}