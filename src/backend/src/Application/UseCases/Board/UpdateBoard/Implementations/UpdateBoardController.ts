import { IUpdateBoardUseCase } from "../Interfaces/IUpdateBoardUseCase";

const ObjectId = require ('mongoose').Types.ObjectId;

export class UpdateBoardController{
  constructor(
    private updateBoardUseCase: IUpdateBoardUseCase
  ){};
  async handle(request, response): Promise<Response>{
    try{
      const userId = request.params.userId;
      const boardId = request.params.boardId;
      const boardTitulo = request.body.titulo;

      if (!ObjectId.isValid(userId)){
        return response.status(400).json({msg: 'Parâmetro de rota inválido!'});
      };

      const requestDTO = {
        userId,
        boardId,
        boardTitulo
      };

      const updateTituloBoard = await this.updateBoardUseCase.execute(requestDTO);

      return response.status(200).json(updateTituloBoard);
    } catch(Error){
      throw Error;
    };
  };
}