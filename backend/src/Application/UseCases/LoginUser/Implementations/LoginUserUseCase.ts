import { IUsersRepository } from "../../../../Core/Repositories/IUsersRepository";
import { ICryptPasswordService } from "../../../Services/Interfaces/ICryptPasswordService";
import { ILoginUserRequestDTO } from "../Interfaces/ILoginUserRequestDTO";
import { ILoginUserUseCase } from "../Interfaces/ILoginUserUseCase";

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private cryptPasswordService: ICryptPasswordService
  ){}
  async execute(data: ILoginUserRequestDTO) {
    try{
      const user = await this.usersRepository.findByEmail(data.email);
      if(!user){
        throw new Error('E-mail não encontrado!');
      };
      const senhaBD = await this.cryptPasswordService.decryptPassword(user.senha);
      if(senhaBD != data.senha){
        throw new Error('Senha incorreta!')
      }
    } catch (Error){
      throw Error;
    }
  }
}