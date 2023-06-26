import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { IReadCardRequestDTO } from "../Interfaces/IReadCardRequestDTO";
import { IReadCardResponseDTO } from "../Interfaces/IReadCardResponseDTO";
import { IReadCardUseCase } from "../Interfaces/IReadCardUseCase";

export class ReadCardUseCase implements IReadCardUseCase{
  constructor (
    private usersRepository: IUsersRepository
  ) {}
  async execute(data: IReadCardRequestDTO): Promise<IReadCardResponseDTO> {
    try {
      const userBD = await this.usersRepository.findById(data.userId);
      if (!userBD) {
        throw new Error('Usuário não foi encontrado, id incorreto!');
      };

      const board = userBD.boards.filter(b => b.id === data.boardId)[0];
      if (!board){
        throw new Error('Board com este id nao encontrado na lista de boards deste usuario');
      };

      const card = board.cards.filter(c => c.id === data.cardId)[0];
      if (!card) {
        throw new Error('Card nao existente nesse board');
      };
      
      const responseDTO = {
        nomeTarefa: card.nomeTarefa,
        descricao: card.descricao,
        conteudo: card.conteudo,
        dataPrazo: card.dataPrazo,
        userNameCriador: card.userNameCriador,
        status: card.status
      };

      return responseDTO;
    } catch (Error) {
      throw Error;
    };
  };
};