import { IUpdateUserUseCase } from "../Interfaces/IUpdateUserUseCase";
import { IUpdateUserRequestDTO } from "../Interfaces/IUpdateUserRequestDTO";
import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { ICryptPasswordService } from "../../../../Services/Interfaces/ICryptPasswordService";
import { IBoardServices } from "../../../../Services/Interfaces/IBoardServices";

export class UpdateUserUseCase implements IUpdateUserUseCase{
  constructor(
    private usersRepository: IUsersRepository,
    private cryptPasswordService: ICryptPasswordService,
    private boardServices: IBoardServices
  ) {}

  async execute(data: IUpdateUserRequestDTO): Promise<void> {
    try{
      const userBD = await this.usersRepository.findById(data.id)

      if(!userBD){
        throw new Error('ID não encontrado!')
      }

      if (userBD.email != data.email){
        const emailExiste = await this.usersRepository.findByEmail(data.email)
        if (emailExiste){
          throw new Error('Este email de usuário já existe!')
        }
      }
      
      if (userBD.userName != data.userName){
        const userNameExiste = await this.usersRepository.findByUserName(data.userName)
        if (userNameExiste){
          throw new Error('Este nome de usuário já existe!');
        };
        await this.boardServices.updateEditor(userBD, data.userName);
        await this.boardServices.updateCriadorCard(userBD, data.userName);
      };
      if (data.senha){
        data.senha = (await this.cryptPasswordService.cryptPassword(data.senha)).toString();
        await this.usersRepository.updateUserBDComSenha(data)
      } else{
        await this.usersRepository.updateUserBDSemSenha({
          id: data.id,
          userName: data.userName,
          email: data.email
        })
      }
    } catch (Error){
      throw Error
    }
  }
}