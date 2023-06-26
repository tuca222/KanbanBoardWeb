import { ICreatBoardUseCase } from "../Interfaces/ICreateBoardUseCase";
const ObjectId = require ('mongoose').Types.ObjectId;


export class CreateBoardController{
  constructor(
    private createBoardUseCase: ICreatBoardUseCase
  ){};
  async handle(request, response): Promise<Response>{
    try {
      const userId = request.params.id;

      if (!ObjectId.isValid(userId)) {
        return response.status(400).json({msg:'Parâmetro de rota incorreto!'});
      };
            
      const board = await this.createBoardUseCase.execute(userId);

      return response.status(200).json({msg:'Board criado com sucesso!', board: board});
    } catch (Error) {
      throw Error
    };
  };
}