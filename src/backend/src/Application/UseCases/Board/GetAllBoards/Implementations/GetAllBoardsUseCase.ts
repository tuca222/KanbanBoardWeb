import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { IBoardDTO } from "../Interfaces/IBoardDTO";
import { IGetAllBoardsResponseDTO } from "../Interfaces/IGetAllBoardsResponseDTO";
import { IGetAllBoardsUseCase } from "../Interfaces/IGetAllBoardsUseCase";

export class GetAllBoardsUseCase implements IGetAllBoardsUseCase{
  constructor(
    private usersRepository: IUsersRepository
  ){}
  async execute(userId: string): Promise<IGetAllBoardsResponseDTO> {
    try{
      const userBD = await this.usersRepository.findById(userId);
      if(!userBD){
        throw new Error('Usuário não encontrado no banco de dados!');
      };

      const boards = userBD.boards;

      let boardsDTO = new Array<IBoardDTO>();

      for (var i = 0; i <= (boards.length - 1); i++){
        boardsDTO.push({
          idBoard: boards[i].id,
          tituloBoard: boards[i].titulo
        });
      };

      return {
        userName: userBD.userName,
        boards: boardsDTO
      };
    } catch (Error) {
      throw Error;
    };
  };
}