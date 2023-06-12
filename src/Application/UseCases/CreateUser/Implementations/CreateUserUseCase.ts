import { response } from "express";
import { User } from "../../../../Core/Entities/User";
import { IUsersRepository } from "../../../../Core/Repositories/IUsersRepository";
import { ICreateUserRequestDTO } from ".././Interfaces/ICreateUserDTO";
import { ICreateUserUseCase } from ".././Interfaces/ICreateUserUseCase";
import { ICreateUserCryptoPassword } from "../Interfaces/ICreateUserCryptoPassword";
import { ICreateUserToken } from "../Interfaces/ICreateUserToken";

export class CreateUserUseCase implements ICreateUserUseCase{
  constructor(
    private usersRepository: IUsersRepository,
    private createUserCryptoPassword: ICreateUserCryptoPassword,
    private createUserToken: ICreateUserToken,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<string> {
    try{
      const userExiste = await this.usersRepository.findByEmail(data.email);

      if (userExiste) {
        throw new Error('Usuário com este email ja existe!');
      }
      
      data.senha = (await this.createUserCryptoPassword.execute(data.senha)).toString();

      const user = new User(data);
      await this.usersRepository.save(user);

      const userCriado = await this.usersRepository.findByEmail(data.email)
      const token = (await this.createUserToken.execute(userCriado._id)).toString();
      return token;

    } catch(Error) {
      throw Error;
    }
  }
}