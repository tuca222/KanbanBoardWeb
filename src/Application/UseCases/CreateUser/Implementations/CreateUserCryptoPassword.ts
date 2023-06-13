require('dotenv').config();
import { ICreateUserCryptoPassword } from "../Interfaces/ICreateUserCryptoPassword";

const crypto = require('crypto-js');

export class CreateUserCryptoPassword implements ICreateUserCryptoPassword{
  async execute(password: string): Promise<string> {
    try {
      const senhaCriptografada = crypto.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET
      );
      return senhaCriptografada;
    } catch(Error) {
      throw new Error('Problema inesperado na criptografia de senha!');
    }
  }
}