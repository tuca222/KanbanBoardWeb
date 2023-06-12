import { User } from "../../Core/Entities/User";
import { IUsersRepository } from "../../Core/Repositories/IUsersRepository";
const Users = require('./Users');

export class MongoUsersRepository implements IUsersRepository{ 
  private userSchema = Users;

  async findByEmail(email: string): Promise<User> {
    const userBD = await this.userSchema.findOne({email: email});
    
    return userBD;
  }

  async save(user: User): Promise<void> {
    this.userSchema.create({
      name: user.name,
      email: user.email,
      senha: user.senha,
      boards: user.boards
    })
  }
}