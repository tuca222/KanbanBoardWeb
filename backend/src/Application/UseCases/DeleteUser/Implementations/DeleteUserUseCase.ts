import { IUsersRepository } from "../../../../Core/Repositories/IUsersRepository";
import { IDeleteUserUseCase } from "../Interfaces/IDeleteUserUseCase";

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}
  async execute(userId: string): Promise<void> {
    try{
      const userBD = await this.usersRepository.findById(userId) 
      if (!userBD){
        throw new Error('Usuário não encontrado!')
      }

      await this.usersRepository.deleteUserById(userId);
    } catch(Error) {
      throw Error;
    }
  }
}