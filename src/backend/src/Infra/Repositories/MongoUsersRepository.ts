import { IUpdateUserBDComSenhaDTO } from "../../Application/UseCases/User/UpdateUser/Interfaces/IUpdateUserBDComSenhaDTO";
import { IUpdateUserBDSemSenhaDTO } from "../../Application/UseCases/User/UpdateUser/Interfaces/IUpdateUserBDSemSenhaDTO";
import { User } from "../../Core/Entities/User";
const Users = require('./Schemas/Users');
import { IUsersRepository } from "../../Core/Repositories/IUsersRepository";

export class MongoUsersRepository implements IUsersRepository{

  
  private userSchema = Users;

  async findAllUsers(): Promise<Array<User>> {
    try{
      const users = await this.userSchema.find();
      return users;
    } catch (Error) {
      throw new Error('Erro ao buscar todos usuarios no banco!')
    };
  };

  async findById(id: string): Promise<User> {
    try{
      const userBD = await this.userSchema.findById({_id: id});
      return userBD;
    } catch (Error) {
      throw new Error('Erro ao consultar usuário por id no banco de dados')
    }
  }

  async findByUserName(userName: string): Promise<User> {
    try{
      const userBD = await this.userSchema.findOne({userName: userName});
      return userBD;  
    } catch (Error) {
      throw new Error('Erro de consulta por nome de usuário no banco de dados');
    };
  } 

  async findByEmail(email: string): Promise<User> {
    try{
      const userBD = await this.userSchema.findOne({email: email});
      return userBD;  
    } catch (Error) {
      throw new Error('Erro de consulta por nome email no banco de dados');
    };
  };

  async saveUserUpdates(user: User) {
    try{
      await this.userSchema.findByIdAndUpdate(user._id, user)
    } catch(Error){
      throw new Error("Erro ao atualizar usuario no Banco!");
    };
  }

  async save(user: User): Promise<void> {
    try{
      await this.userSchema.create({
        userName: user.userName,
        email: user.email,
        senha: user.senha,
        boards: user.boards
      });
    } catch(Error) {
      throw new Error('Erro ao inserir um usuário no banco de dados');
    };
  };
  
  async updateUserBDComSenha(updateUserDTOComSenha: IUpdateUserBDComSenhaDTO): Promise<void> {
    try{
      await this.userSchema.findByIdAndUpdate(updateUserDTOComSenha.id, {
        userName: updateUserDTOComSenha.userName,
        email: updateUserDTOComSenha.email,
        senha: updateUserDTOComSenha.senha
      });
    } catch (Error) {
      throw new Error('Erro ao atualizar o usuário no banco de dados');
    };
  };
  
  async updateUserBDSemSenha(updateUserDTOSemSenha: IUpdateUserBDSemSenhaDTO): Promise<void> {
    try{
      await this.userSchema.findByIdAndUpdate(updateUserDTOSemSenha.id, {
        userName: updateUserDTOSemSenha.userName,
        email: updateUserDTOSemSenha.email
      });
    } catch (Error) {
      throw new Error('Erro ao atualizar o usuário no banco de dados');
    };
  };

  async deleteUserById(userId: string): Promise<void> {
    try{
      await this.userSchema.deleteOne({ _id: userId });
    } catch(Error) {
      throw new Error('Usuário com este ID não encontrado!');
    };
  };
};
