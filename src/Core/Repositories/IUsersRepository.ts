import mongoose from 'mongoose';
import { User } from '../Entities/User'
const Users = require('../../Infra/Repositories/Users');


export interface IUsersRepository{
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}