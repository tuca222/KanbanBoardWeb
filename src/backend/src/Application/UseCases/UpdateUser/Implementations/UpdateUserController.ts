import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController{
  constructor (
    private updateUserUseCase: UpdateUserUseCase
  ) {}

  async handle(request, response): Promise<Response>{
    try{
      const id = request.params.id;
      if (id.length != 24){
        throw new Error('ID inválido!')
      }
      const {userName, email, senha, senhaConfirmada} = request.body;
      if ((!userName) || (!email)) {
        return response.status(422).json({msg: 'O campo não pode ser vazio!'})
      }
      if (senha != senhaConfirmada) {
        return response.status(422).json({msg: 'As senhas devem ser iguais!'})
      }

      await this.updateUserUseCase.execute({
        id,
        userName,
        email,
        senha,
      });

      return response.status(200).json({msg:'Usuário atualizado com sucesso!'})
    } catch(Error) {
      throw Error
    }
  }
}