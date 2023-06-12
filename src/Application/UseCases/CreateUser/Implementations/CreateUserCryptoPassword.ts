import { ICreateUserCryptoPassword } from "../Interfaces/ICreateUserCryptoPassword";

const crypto = require('crypto-js');

export class CreateUserCryptoPassword implements ICreateUserCryptoPassword{
  execute(password: string): Promise<string> {
    const senhaCriptografada = crypto.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    )
    return senhaCriptografada;
  }
}