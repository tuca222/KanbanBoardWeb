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

  async execute(data: ICreateUserRequestDTO) {
    try{
      const userExiste = await this.usersRepository.findByEmail(data.email)

      if (userExiste) {
        return response.status(422).json({msg: 'Usuário com email já cadastrado!'});
      }
      
      data.senha = (await this.createUserCryptoPassword.execute(data.senha)).toString()
      const user = new User(data);
      const idNewUser = await this.usersRepository.save(user);
      console.log(idNewUser);
      this.createUserToken.execute(idNewUser);
      return response.status(201).json({msg: 'Usuário Criado com sucesso!'});

    } catch(error) {
      return response.status(500).json({msg: 'Erro inesperado'});
    }
  }
}