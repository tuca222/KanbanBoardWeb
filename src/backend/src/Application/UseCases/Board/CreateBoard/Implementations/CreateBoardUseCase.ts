import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { IBoardService } from "../../../../Services/Interfaces/IBoardService";
import { ICreateBoardResponseDTO } from "../Interfaces/ICreateBoardResponseDTO";
import { ICreatBoardUseCase } from "../Interfaces/ICreateBoardUseCase";

export class CreateBoardUseCase implements ICreatBoardUseCase{
  constructor (
    private usersRepository: IUsersRepository,
    private boardService: IBoardService
  ){};
  async execute(userId: string): Promise<ICreateBoardResponseDTO> {
    try{
      const userBD = await this.usersRepository.findById(userId);
      if (!userBD) {
        throw new Error('Usuário não encontrado no banco de dados!');
      };

      const board = await this.boardService.createBoard(userBD);

      return {
        id: board.id, 
        titulo: board.titulo
      };
    } catch(Error){
      throw Error;
    };
  };
}