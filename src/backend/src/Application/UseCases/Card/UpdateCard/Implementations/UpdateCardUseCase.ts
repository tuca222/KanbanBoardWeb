import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { ICardService } from "../../../../Services/Interfaces/ICardService";
import { IUpdateCardRequestDTO } from "../Interfaces/IUpdateCardRequestDTO";
import { IUpdateCardResponseDTO } from "../Interfaces/IUpdateCardResponseDTO";
import { IUpdateCardUseCase } from "../Interfaces/IUpdateCardUseCase";

export class UpdateCardUseCase implements IUpdateCardUseCase {
  constructor (
    private usersRepository: IUsersRepository,
    private cardService: ICardService,
  ) {}
  async execute(data: IUpdateCardRequestDTO): Promise<IUpdateCardResponseDTO>{
    try {
      const userDB = await this.usersRepository.findById(data.userId);
      if (!userDB) {
        throw new Error('Usuário não foi encontrado, id incorreto!')
      };

      const board = userDB.boards.filter(b => b.id === data.boardId)[0];
      if (!board) {
        throw new Error('Board com este id nao encontrado na lista de boards deste usuario');
      };

      const card = board.cards.filter(c => c.id === data.cardId)[0];
      if (!card) {
        throw new Error('Card nao existente nesse board');
      };

      const updateCardInfos = {
        nomeTarefa: data.nomeTarefa,
        descricao: data.descricao,
        conteudo: data.conteudo,
        dataPrazo: data.dataPrazo,
        status: data.status
      };
      const newCard = await this.cardService.updateCard(board, card, updateCardInfos);

      return newCard;
    } catch (Error) {
      throw Error;
    };
  };
};