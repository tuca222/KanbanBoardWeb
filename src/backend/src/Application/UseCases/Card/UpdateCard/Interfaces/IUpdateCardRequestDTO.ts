import { Status } from "../../../../../Core/Entities/Card";

export interface IUpdateCardRequestDTO {
  userId: string,
  boardId: string,
  cardId: string,
  nomeTarefa: string,
  descricao: string,
  conteudo: string,
  dataPrazo: string,
  status: Status
}