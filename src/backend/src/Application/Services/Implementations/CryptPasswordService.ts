import { ICryptPasswordService } from "../Interfaces/ICryptPasswordService";
require('dotenv').config();
const crypto = require('crypto-js');

export class CryptPasswordService implements ICryptPasswordService{
  async cryptPassword(password: string): Promise<string> {
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
  async decryptPassword(cryptPassword: string): Promise<string> {
    try{
      const decryptPassword = crypto.AES.decrypt(
        cryptPassword,
        process.env.PASSWORD_SECRET
      ).toString(crypto.enc.Utf8)

      return decryptPassword;
    } catch(Error){
      throw new Error('Problema inesperado na decriptografia de senha!')
    }
  }
}