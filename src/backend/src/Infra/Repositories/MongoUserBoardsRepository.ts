import { User } from "../../Core/Entities/User";
import { IUserBoardsRepository } from "../../Core/Repositories/IUserBoardsRepository";
const Users = require('./Schemas/Users')

export class MongoUserBoardsRepository implements IUserBoardsRepository{
  private userSchema = Users;

  async updateEditor(user: User): Promise<void> {
    try{
      await this.userSchema.findByIdAndUpdate(user._id, user)
    } catch(Error){
      throw new Error("Erro ao atualizar userName do Editor no Banco!");
    };
  };

  async updateCriadorCard(user: User): Promise<void> {
    try{
      await this.userSchema.findByIdAndUpdate(user._id, user)
    } catch(Error){
      throw new Error("Erro ao atualizar userName do Criador do Card no Banco!");
    };
  }

}