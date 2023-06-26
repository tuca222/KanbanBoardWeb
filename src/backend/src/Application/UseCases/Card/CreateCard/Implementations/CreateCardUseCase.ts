import { Card } from "../../../../../Core/Entities/Card";
import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { ICardService } from "../../../../Services/Interfaces/ICardService";
import { ICreateCardUseCase } from "../Interfaces/ICreateCardUseCase";

export class CreateCardUseCase implements ICreateCardUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private cardServices: ICardService
  ) {}

  async execute(userId: string, boardId: string): Promise<Card> {
    try{
      const userBD = await this.usersRepository.findById(userId);
      if (!userBD) {
        throw new Error('Usuário não foi encontrado, id incorreto!')
      }
      const newCard = await this.cardServices.createCard(userBD, boardId);
      return newCard;
    } catch (Error) {
      throw Error;
    }
  }

}