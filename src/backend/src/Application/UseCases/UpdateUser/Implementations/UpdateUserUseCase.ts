import { IUsersRepository } from "../../../../Core/Repositories/IUsersRepository";
import { ICryptPasswordService } from "../../../Services/Interfaces/ICryptPasswordService";
import { IUpdateUserUseCase } from "../Interfaces/IUpdateUserUseCase";
import { IUpdateUserRequestDTO } from "../Interfaces/IUpdateUserRequestDTO";

export class UpdateUserUseCase implements IUpdateUserUseCase{
  constructor(
    private usersRepository: IUsersRepository,
    private cryptPasswordService: ICryptPasswordService
  ) {}

  async execute(data: IUpdateUserRequestDTO): Promise<void> {
    try{
      const userBD = await this.usersRepository.findById(data.id)
      if (userBD.email != data.email){
        const emailExiste = await this.usersRepository.findByEmail(data.email)
        if (emailExiste){
          throw new Error('Este email de usuário já existe!')
        }
      }
      
      if (userBD.userName != data.userName){
        const userNameExiste = await this.usersRepository.findByUserName(data.userName)
        if (userNameExiste){
          throw new Error('Este nome de usuário já existe!')
        }
      }

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