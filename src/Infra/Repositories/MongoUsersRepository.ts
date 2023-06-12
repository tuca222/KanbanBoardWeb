import { User } from "../../Core/Entities/User";
import { IUsersRepository } from "../../Core/Repositories/IUsersRepository";
const UserSchema = require('./UserSchema');

export class MongoUsersRepository implements IUsersRepository{ 
  private userSchema = UserSchema;

  async findByEmail(email: string): Promise<User> {
    const userBD = await this.userSchema.findOne({email: email});
    if (!userBD){
      return null;
    }
    return userBD;
  }

  async save(user: User): Promise<string> {
    const novoUsuario = this.userSchema.create({
      name: user.name,
      email: user.email,
      senha: user.senha,
      boards: user.boards
    })
    return novoUsuario._id;
  }
}