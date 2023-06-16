import { ICryptPasswordService } from "../Interfaces/ICryptPasswordService";
require('dotenv').config();
const crypto = require('crypto-js');

export class CryptPasswordService implements ICryptPasswordService{
  cryptPassword(password: string): Promise<string> {
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
  decryptPassword(cryptPassword: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

}