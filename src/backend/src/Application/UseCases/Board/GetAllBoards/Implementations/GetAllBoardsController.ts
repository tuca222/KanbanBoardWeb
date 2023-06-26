import { IGetAllBoardsUseCase } from "../Interfaces/IGetAllBoardsUseCase";
const ObjectId = require ('mongoose').Types.ObjectId;


export class GetAllBoardsController{
  constructor(
    private getAllBoardsUseCase: IGetAllBoardsUseCase
  ){};
  async handle(request, response): Promise<Response>{
    try {
      const id = request.params.id;
      if(!ObjectId.isValid(id)){
        return response.status(400).json({msg:'Parâmetro de rota incorreto!'});
      };

      const boards = await this.getAllBoardsUseCase.execute(id);

      return response.status(200).json(boards);
    } catch (Error) {
      throw Error      
    };
  };
}