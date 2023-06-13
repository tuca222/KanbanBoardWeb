require('dotenv').config();
import { ICreateUserToken } from "../Interfaces/ICreateUserToken";
const jwt = require('jsonwebtoken');

export class CreateUserToken implements ICreateUserToken {
  async execute(id: string): Promise<string> {
    try{
      const token = jwt.sign(
        {id},
        process.env.TOKEN_SECRET,
        { expiresIn: '24h' }
    )
    return token;
    } catch(Error){
      throw new Error('Erro inesperado na criação do token');
    }
  }
}