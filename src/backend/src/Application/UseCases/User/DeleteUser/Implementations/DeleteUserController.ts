import { Response } from "express";
import { IDeleteUserUseCase } from "../Interfaces/IDeleteUserUseCase";

export class DeleteUserController {
  constructor(
    private deleteUserUseCase: IDeleteUserUseCase
  ){}

  async handle(request, response): Promise<Response> {
    try{
      const id = request.params.id;
      if (id.length != 24){
        throw new Error('ID inválido')
      }
      await this.deleteUserUseCase.execute(id);
    
      request.session.destroy();
      return response.status(200).json({msg: 'Usuário excluido com sucesso! Sessão encerrada!'});
    } catch(Error) {
      throw Error;
    }
    return;
  }
}