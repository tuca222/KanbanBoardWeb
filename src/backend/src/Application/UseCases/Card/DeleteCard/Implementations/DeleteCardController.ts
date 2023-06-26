import { IDeleteCardUseCase } from "../Interfaces/IDeleteCardUseCase";
const ObjectId = require ('mongoose').Types.ObjectId;

export class DeleteCardController {
  constructor (
    private deleteCardUseCase: IDeleteCardUseCase
  ) {}

  async handle(request, response): Promise<Response> {
    try {
      const userId = request.params.userId;
      const boardId = request.params.boardId;
      const cardId = request.params.cardId;

      if (!ObjectId.isValid(userId)){
        return response.status(400).json({msg: 'Parametro de rota userId incorreto!'})
      };

      await this.deleteCardUseCase.execute({
        userId,
        boardId,
        cardId
      });

      return response.status(200).json({msg: 'Card excluido com sucesso!'});
    } catch (Error) {
      throw Error;
    };
  };
}