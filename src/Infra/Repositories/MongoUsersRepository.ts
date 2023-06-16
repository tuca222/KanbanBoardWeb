import { User } from "../../Core/Entities/User";
const Users = require('./Schemas/Users');
import { IUsersRepository } from "../../Core/Repositories/IUsersRepository";

export class MongoUsersRepository implements IUsersRepository{ 
  private userSchema = Users;

  async findByEmail(email: string): Promise<User> {
    try{
      const userBD = await this.userSchema.findOne({email: email});
      return userBD;  
    } catch (Error) {
      throw new Error('Erro de consulta no banco de dados');
    };
  };

  async save(user: User): Promise<void> {
    try{
      this.userSchema.create({
        userName: user.userName,
        email: user.email,
        senha: user.senha,
        boards: user.boards
      });
    } catch(Error) {
      throw new Error('Erro ao inserir um usuário no banco de dados');
    };
  };
};