export interface ICreateUserToken {
  execute(id: string): Promise<string>
}