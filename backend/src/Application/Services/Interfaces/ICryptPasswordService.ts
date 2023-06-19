export interface ICryptPasswordService{
  cryptPassword(password: string): Promise<string>;
  decryptPassword(cryptPassword: string): Promise<string>;
}