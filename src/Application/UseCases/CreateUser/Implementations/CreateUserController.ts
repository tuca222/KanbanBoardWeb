import { Request, Response } from "express";
import { ICreateUserUseCase } from "../Interfaces/ICreateUserUseCase";

export class CreateUserController {
  constructor(
    private createUserUseCase: ICreateUserUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try{  
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

      const tokenAutenticacao = await this.createUserUseCase.execute({
        name,
        email,
        senha,
      });
                                                          //ms - 1hora
      response.cookie('token', tokenAutenticacao, {maxAge: 3600 * 1000, httpOnly: true})
      return response.status(201).json({msg: "Usuário criado com sucesso!"});
    } catch (Error) {
      return response.status(422).json({msg: Error.message});
    };
  }
}