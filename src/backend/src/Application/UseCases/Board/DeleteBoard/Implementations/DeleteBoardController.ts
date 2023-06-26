import { IDeleteBoardUseCase } from "../Interfaces/IDeleteBoardUseCase";

const ObjectId = require ('mongoose').Types.ObjectId;


export class DeleteBoardController{
  constructor(
    private deleteBoardUseCase: IDeleteBoardUseCase
  ){}
  async handle(request, response): Promise<Response>{
    try {
      const userId = request.params.userId;
      const boardId = request.params.boardId;
      
      if(!ObjectId.isValid(userId)){
        return response.status(400).json({mgs: 'Parâmetro de rota incorreto!'});
      };

      await this.deleteBoardUseCase.execute({
        userId,
        boardId
      });

      return response.status(200).json({msg: 'Board excluído com sucesso!'})

    } catch (Error) {
      throw Error;
    };
  };
}