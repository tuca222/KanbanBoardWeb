import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { IBoardService } from "../../../../Services/Interfaces/IBoardService";
import { IGetEditoresBoardRequestDTO } from "../Interfaces/IGetEditoresBoardRequestDTO";
import { IGetEditoresBoardUseCase } from "../Interfaces/IGetEditoresBoardUseCase";

export class GetEditoresBoardUseCase implements IGetEditoresBoardUseCase {
  constructor (
    private usersRepository: IUsersRepository,
    private boardService: IBoardService,
  ) {}

  async execute(data: IGetEditoresBoardRequestDTO): Promise<string[]> {
    try {
      const userBD = await this.usersRepository.findById(data.userId);
      if (!userBD) {
        throw new Error('Usuário não foi encontrado, id incorreto!');
      };

      const board = userBD.boards.filter(b => b.id === data.boardId)[0];
      if (!board){
        throw new Error('Board com este id nao encontrado na lista de boards deste usuario');
      };

      const editores = await this.boardService.getEditores(board.id);

      return editores;
    } catch (Error) {
      throw Error;
    };
  };

}