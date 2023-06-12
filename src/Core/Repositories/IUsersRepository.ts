import { User } from '../Entities/User'

export interface IUsersRepository{
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<string>;
}