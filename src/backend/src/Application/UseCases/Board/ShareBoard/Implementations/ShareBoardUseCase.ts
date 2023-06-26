import { IUsersRepository } from "../../../../../Core/Repositories/IUsersRepository";
import { IBoardService } from "../../../../Services/Interfaces/IBoardService";
import { IShareBoardRequestDTO } from "../Interfaces/IShareBoardRequestDTO";
import { IShareBoardUseCase } from "../Interfaces/IShareBoardUseCase";

export class ShareBoardUseCase implements IShareBoardUseCase{
  constructor (
    private usersRepository: IUsersRepository,
    private boardService: IBoardService
  ){}
  async execute(data: IShareBoardRequestDTO): Promise<void> {
    try{
      const userBD = await this.usersRepository.findById(data.userId);
      if (!userBD){
        throw new Error('Usuário não encontrado no banco de dados!');
      };

      const boardASerCompartilhado = userBD.boards.filter(b => b.id === data.boardId)[0];

      if(!boardASerCompartilhado){
        throw new Error('Board não encontrado!')
      }

      if (boardASerCompartilhado.dono !== userBD.userName){
        throw new Error('Você não pode compartilhar o Board, somente quem criou pode fazer isso!')
      }

      await this.boardService.shareBoard(userBD, data.emailUserNovoAcesso, boardASerCompartilhado.id)
    } catch (Error){
      throw Error
    };
  };
}