import { User } from "../../../../../Core/Entities/User";
import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { ICryptPasswordService } from "../../../../Services/Interfaces/ICryptPasswordService";
import { ICreateUserRequestDTO } from ".././Interfaces/ICreateUserDTO";
import { ICreateUserUseCase } from ".././Interfaces/ICreateUserUseCase";

export class CreateUserUseCase implements ICreateUserUseCase{
  constructor(
    private usersRepository: IUsersRepository,
    private cryptPasswordService: ICryptPasswordService,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<string> {
    try{
      const emailExiste = await this.usersRepository.findByEmail(data.email);
      if (emailExiste) {
        throw new Error('Usuário com este email já existe!');
      }

      const userNameExiste = await this.usersRepository.findByUserName(data.userName)
      if (userNameExiste) {
        throw new Error('Nome de usuário já existe!')
      }
      
      data.senha = (await this.cryptPasswordService.cryptPassword(data.senha)).toString();
      const user = new User(data);
      await this.usersRepository.save(user);

      const newUserMongo = await this.usersRepository.findByEmail(user.email)
      return newUserMongo._id;
    } catch(Error) {
      throw Error;
    }
  }
}