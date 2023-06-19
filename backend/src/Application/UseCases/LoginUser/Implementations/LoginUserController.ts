import { ILoginUserUseCase } from "../Interfaces/ILoginUserUseCase";
import { LoginUserUseCase } from "./LoginUserUseCase"

export class LoginUserController{
  constructor (
    private loginUserUseCase: ILoginUserUseCase
  ){}
  async handle(request, response): Promise<Response>{
    try{
      const {email, senha} = request.body;
      if (!email){
        return response.status(422).json({msg:'O email é obrigatório!'});
      };
      if (!senha){
        return response.status(422).json({msg:'A senha é obrigatória!'});
      };
      await this.loginUserUseCase.execute({
        email,
        senha
      });
      request.session.authenticated = true;
      return response.status(200).json({msg:'Usuário logado com sucesso!'})
    } catch (Error){
      throw Error;
    };
  }
}