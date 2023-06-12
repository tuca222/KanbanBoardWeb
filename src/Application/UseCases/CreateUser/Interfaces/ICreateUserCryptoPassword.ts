export interface ICreateUserCryptoPassword {
  execute(password: string): Promise<string>;
}