import { IReadBoardUseCase } from "../Interfaces/IReadBoardUseCase";
const ObjectId = require ('mongoose').Types.ObjectId;

export class ReadBoardController{
  constructor(
    private readBoardUseCase: IReadBoardUseCase
  ){};

  async handle(request, response): Promise<Response>{
    try{
      const userId = request.params.userId;
      const boardId = request.params.boardId;

      if(!ObjectId.isValid(userId)) {
        return response.status(400).json({msg:'Parâmetro de rota incorreto!'});
      };
      
      const board = await this.readBoardUseCase.execute(userId, boardId);

      return response.status(200).json(board);
    } catch (Error){
      throw Error
    };
  };
}