import { User } from "../../../Core/Entities/User";
import { IUserBoardsRepository } from "../../../Core/Repositories/IUserBoardsRepository";
import { IBoardServices } from "../Interfaces/IBoardServices";

export class BoardServices implements IBoardServices{
  constructor(
    private userBoardsRepository: IUserBoardsRepository
  ){}
  async updateEditor(userBD: User, newUserName: string): Promise<void> {
    try{
      for (var i = 0; i <= (userBD.boards.length - 1); i++){
        for (var j = 0; j <= (userBD.boards[i].editores.length - 1); j++){
          if (userBD.boards[i].editores[j] === userBD.userName){
            userBD.boards[i].editores[j] = newUserName;
            await this.userBoardsRepository.updateEditor(userBD);
            break
          };
        };
      };
    } catch(Error) {
      throw new Error("Erro ao atualizar o userName do Editor!")
    }
  };

  async updateCriadorCard(userBD: User, newUserName: string): Promise<void> {
    try{
      for (var i = 0; i <= (userBD.boards.length - 1); i++){
        for (var j = 0; j <= (userBD.boards[i].cards.length - 1); j++){
          if (userBD.boards[i].cards[j].userNameCriador === userBD.userName){
            userBD.boards[i].cards[j].userNameCriador = newUserName;
            await this.userBoardsRepository.updateCriadorCard(userBD);
          };
        };
      };
    } catch(Error) {
      throw new Error("Erro ao atualizar o userName do Criador do Card!")
    }
  }

}