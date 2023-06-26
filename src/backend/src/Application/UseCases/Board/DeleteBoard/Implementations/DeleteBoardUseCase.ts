import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { IBoardService } from "../../../../Services/Interfaces/IBoardService";
import { IDeleteBoardRequestDTO } from "../Interfaces/IDeleteBoardRequestDTO";
import { IDeleteBoardUseCase } from "../Interfaces/IDeleteBoardUseCase";

export class DeleteBoardUseCase implements IDeleteBoardUseCase{
  constructor(
    private usersRepository: IUsersRepository,
    private boardService: IBoardService
  ){}
  async execute(data: IDeleteBoardRequestDTO): Promise<void> {
    try {
      const userBD = await this.usersRepository.findById(data.userId);
      if (!userBD){
        throw new Error('Usuário com este ID não foi encontrado!');
      };

      const board = userBD.boards.filter(b => b.id === data.boardId)[0];
      if(!board){
        throw new Error('Board com este ID não foi encontrado na lista de Boards deste usuário!');
      };

      if (userBD.userName != board.dono){
        throw new Error('Usuário não possui acesso para excluir este Board!')
      }

      await this.boardService.deleteBoard(data.boardId)

    }catch(Error){
      throw Error;
    };
  };
}