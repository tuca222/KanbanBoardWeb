import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { ICardService } from "../../../../Services/Interfaces/ICardService";
import { IDeleteCardRequestDTO } from "../Interfaces/IDeleteCardRequestDTO";
import { IDeleteCardUseCase } from "../Interfaces/IDeleteCardUseCase";

export class DeleteCardUseCase implements IDeleteCardUseCase {
  constructor (
    private usersRepository: IUsersRepository,
    private cardService: ICardService
  ) {}

  async execute(data: IDeleteCardRequestDTO): Promise<void> {
    try {
      const userBd = await this.usersRepository.findById(data.userId);
      if (!userBd){
        throw new Error('Usuário não foi encontrado, id incorreto!');
      }

      const board = userBd.boards.filter(b => b.id === data.boardId)[0];
      if (!board) {
        throw new Error('Board com este id nao encontrado na lista de boards deste usuario');
      }

      const card = board.cards.filter(c => c.id === data.cardId)[0];
      if (!card) {
        throw new Error('Card nao existente nesse board');
      };

      await this.cardService.deleteCard(board.id, card.id);

    } catch (Error) {
      throw Error;
    };
  };

};