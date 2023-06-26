import { IReadCardUseCase } from "../Interfaces/IReadCardUseCase";
const ObjectId = require ('mongoose').Types.ObjectId;

export class ReadCardController {
  constructor(
    private readCardUseCase: IReadCardUseCase
  ){}

  async handle(request, response): Promise<Response> {
    try{
      const userId = request.params.userId;
      const boardId = request.params.boardId;
      const cardId = request.params.cardId;
      if (!ObjectId.isValid(userId)){
        return response.status(400).json({msg: 'Parametro de rota userId incorreto!'})
      };
      
      const card = await this.readCardUseCase.execute({userId, boardId, cardId});

      return response.status(200).json({card: card});
    } catch (Error) {
      throw Error;
    };
  };
};