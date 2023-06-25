import { IUpdateUserBDComSenhaDTO } from '../../Application/UseCases/User/UpdateUser/Interfaces/IUpdateUserBDComSenhaDTO';
import { IUpdateUserBDSemSenhaDTO } from '../../Application/UseCases/User/UpdateUser/Interfaces/IUpdateUserBDSemSenhaDTO';
import { User } from '../Entities/User'

export interface IUsersRepository{
  saveUserUpdates(user: User);
  findById(id: string): Promise<User>;
  findByUserName(userName: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
  deleteUserById(userId: string): Promise<void>;
  updateUserBDComSenha(updateUserDTOComSenha: IUpdateUserBDComSenhaDTO): Promise<void>;
  updateUserBDSemSenha(updateUserDTOSemSenha: IUpdateUserBDSemSenhaDTO): Promise<void>;
};