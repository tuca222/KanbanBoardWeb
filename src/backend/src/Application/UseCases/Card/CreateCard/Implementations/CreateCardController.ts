import { ICreateCardUseCase } from "../Interfaces/ICreateCardUseCase";

const ObjectId = require ('mongoose').Types.ObjectId;

export class CreateCardController {
  constructor(
    private createCardUseCase: ICreateCardUseCase
  ) {}

  async handle(request, response): Promise<Response> {
    try{
      const userId = request.params.userId;
      const boardId = request.params.boardId;
      
      if (!ObjectId.isValid(userId)){
        return response.status(400).json({msg: 'Parametro de rota incorreto!'})
      }
      
      const newCard = await this.createCardUseCase.execute(userId, boardId);

      return response.status(200).json({card: newCard});
    } catch (Error) {
      throw Error;
    }
    
  }
}