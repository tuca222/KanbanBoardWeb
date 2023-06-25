import { IReadUserUseCase } from "../Interfaces/IReadUserUseCase";

export class ReadUserController {
  constructor(
    private readUserUseCase: IReadUserUseCase
  ) {}

  async handle(request, response): Promise<Response> {
    try{
      const id = request.params.id;
      if (id.length != 24){
        throw new Error('ID inválido!')
      }
      const dados = await this.readUserUseCase.execute(id);

      return response.status(200).json({userName: dados.userName, email: dados.email});
    } catch (Error) {
      throw Error;
    }
  }

}