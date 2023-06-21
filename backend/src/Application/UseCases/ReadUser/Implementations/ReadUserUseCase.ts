import { IUsersRepository } from "../../../../Core/Repositories/IUsersRepository";
import { IReadUserUseCaseResponseDTO } from "../Interfaces/IReadUserResponseDTO";
import { IReadUserUseCase } from "../Interfaces/IReadUserUseCase";

export class ReadUserUseCase implements IReadUserUseCase {
  constructor (
    private usersRepository: IUsersRepository
  ) {}

  async execute(userId: string): Promise<IReadUserUseCaseResponseDTO> {
    try{
      console.log(userId);
      const userMongo = await this.usersRepository.findById(userId);
      if (!userMongo) {
        throw new Error('Usuário com este ID não encontrado!')
      }

      return {
        userName: userMongo.userName,
        email: userMongo.email
      };
    } catch (Error) {
      throw Error;
    }
  }
}