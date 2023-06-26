import { IShareBoardUseCase } from "../Interfaces/IShareBoardUseCase";
const ObjectId = require ('mongoose').Types.ObjectId;

export class ShareBoardController{
  constructor (
    private shareBoarsUseCase: IShareBoardUseCase
  ){};
  async handle(request, response): Promise<Response>{
    try {
      const userDonoId = request.params.userId;
      const boardId = request.params.boardId;
      const emailUserCompartilhado = request.body.email;

      if(!ObjectId.isValid(userDonoId)){
        return response.status(400).json({msg:'Parâmetro de rota incorreto!'});
      };

      const requestDTO = {
        userId: userDonoId,
        boardId: boardId,
        emailUserNovoAcesso: emailUserCompartilhado
      };

      await this.shareBoarsUseCase.execute(requestDTO);

      return response.status(200).json({msg: 'Board compartilhado com sucesso!'});
    } catch (Error) {
      throw Error
    };
  };
}