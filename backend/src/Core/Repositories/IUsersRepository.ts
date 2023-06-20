import { User } from '../Entities/User'

export interface IUsersRepository{
  findByUserName(userName: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}