import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { IReadBoardResponseDTO } from "../Interfaces/IReadBoardResponseDTO";
import { IReadBoardUseCase } from "../Interfaces/IReadBoardUseCase";

export class ReadBoardUseCase implements IReadBoardUseCase{
  constructor(
    private usersRepository: IUsersRepository
  ){}
  async execute(userId: string, boardId: string): Promise<IReadBoardResponseDTO> {
    try{
      const userBD = await this.usersRepository.findById(userId)
      if (!userBD){
        throw new Error('Usuário não encontrado no banco de dados!');
      };

      const board = userBD.boards.filter(b => b.id === boardId)[0];
      
      if (!board){
        throw new Error('Board com este ID não encontrado na lista de boards do usuário!');
      };

      const dono = (board.dono === userBD.userName);
      
      
      return {
        board: board,
        dono: dono
      };
    } catch(Error){
      throw Error;
    };
  };
}