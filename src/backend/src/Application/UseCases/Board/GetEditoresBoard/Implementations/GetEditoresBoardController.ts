import { IGetEditoresBoardUseCase } from "../Interfaces/IGetEditoresBoardUseCase";

const ObjectId = require ('mongoose').Types.ObjectId;

export class GetEditoresBoardController {
  constructor (
    private getEditoresBoardUseCase: IGetEditoresBoardUseCase
  ) {}
  async handle(request, response): Promise<Response> {
    try {
      const userId = request.params.userId;
      const boardId = request.params.boardId;

      if (!ObjectId.isValid(userId)){
        return response.status(400).json({msg: 'Parametro de rota userId incorreto!'})
      };

      const editores = await this.getEditoresBoardUseCase.execute({
        userId,
        boardId
      });

      return response.status(200).json({editores: editores});
    } catch (Error) {
      throw Error;
    };
  };
};