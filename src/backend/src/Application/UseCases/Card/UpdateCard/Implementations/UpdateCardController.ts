import { IUpdateCardUseCase } from "../Interfaces/IUpdateCardUseCase";
const ObjectId = require ('mongoose').Types.ObjectId;

export class UpdateCardController {
  constructor (
    private updateCardUseCase: IUpdateCardUseCase
  ) {}
  async handle(request, response): Promise<Response> {
    try {
      const userId = request.params.userId;
      const boardId = request.params.boardId;
      const cardId = request.params.cardId;

      const {nomeTarefa, descricao, conteudo, dataPrazo, status} = request.body;
      
      if (!ObjectId.isValid(userId)){
        return response.status(400).json({msg: 'Parametro de rota userId incorreto!'})
      };
      const requestDTO = {
        userId,
        boardId,
        cardId,
        nomeTarefa, 
        descricao, 
        conteudo, 
        dataPrazo, 
        status
      };
      console.log('controller')
      const updatedCard = await this.updateCardUseCase.execute(requestDTO);

      return response.status(200).json({card: updatedCard});
    } catch (Error) {
      throw Error;
    };
  };
};