require('dotenv').config();
import { ICreateUserToken } from "../Interfaces/ICreateUserToken";
const jwt = require('jsonwebtoken');

export class CreateUserToken implements ICreateUserToken {
  execute(id: string): Promise<string> {
    const token = jwt.sign(
      id,
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    )
    return token;
  }

}