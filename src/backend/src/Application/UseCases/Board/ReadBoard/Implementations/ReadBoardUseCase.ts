import { Board } from "../../../../../Core/Entities/Board";
import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { IReadBoardUseCase } from "../Interfaces/IReadBoardUseCase";

export class ReadBoardUseCase implements IReadBoardUseCase{
  constructor(
    private usersRepository: IUsersRepository
  ){}
  async execute(userId: string, boardId: string): Promise<Board> {
    try{
      const userBD = await this.usersRepository.findById(userId)
      if (!userBD){
        throw new Error('Usuário não encontrado no banco de dados!');
      };

      const board = userBD.boards.filter(b => b.id === boardId)[0];

      return board;
    } catch(Error){
      throw Error;
    };
  };
}