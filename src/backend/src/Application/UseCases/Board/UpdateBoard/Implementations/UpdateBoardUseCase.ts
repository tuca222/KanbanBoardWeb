import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { IBoardService } from "../../../../Services/Interfaces/IBoardService";
import { IUpdateBoardRequestDTO } from "../Interfaces/IUpdateBoardRequestDTO";
import { IUpdateBoardUseCase } from "../Interfaces/IUpdateBoardUseCase";

export class UpdateBoardUseCase implements IUpdateBoardUseCase{
  constructor (
    private usersRepository: IUsersRepository,
    private boardServide: IBoardService
  ){};
  async execute(data: IUpdateBoardRequestDTO): Promise<string> {
    try {
      const userDB = await this.usersRepository.findById(data.userId);
      if(!userDB){
        throw new Error('Usuário não encontrado no banco de dados!');
      };

      const board = userDB.boards.filter(b => b.id === data.boardId)[0];
      if(!board){
        throw new Error('Board com este ID não foi encontrado na lista de Boards deste ususário!');
      };

      if (userDB.userName != board.dono){
        throw new Error('Usuário não pode editar este Board!')
      }

      await this.boardServide.updateTituloBoard(data.boardId, data.boardTitulo);
      
      return data.boardTitulo;
    } catch (Error) {
      throw Error;  
    };
  };
}