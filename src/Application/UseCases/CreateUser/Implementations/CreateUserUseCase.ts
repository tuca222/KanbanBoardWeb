import { User } from "../../../../Core/Entities/User";
import { IUsersRepository } from "../../../../Core/Repositories/IUsersRepository";
import { ICryptPasswordService } from "../../../Services/Interfaces/ICryptPasswordService";
import { ICreateUserRequestDTO } from ".././Interfaces/ICreateUserDTO";
import { ICreateUserUseCase } from ".././Interfaces/ICreateUserUseCase";

export class CreateUserUseCase implements ICreateUserUseCase{
  constructor(
    private usersRepository: IUsersRepository,
    private cryptPasswordService: ICryptPasswordService,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    try{
      const userExiste = await this.usersRepository.findByEmail(data.email);

      if (userExiste) {
        throw new Error('Usuário com este email ja existe!');
      }
      
      data.senha = (await this.cryptPasswordService.cryptPassword(data.senha)).toString();
      const user = new User(data);
      await this.usersRepository.save(user);

    } catch(Error) {
      throw Error;
    }
  }
}