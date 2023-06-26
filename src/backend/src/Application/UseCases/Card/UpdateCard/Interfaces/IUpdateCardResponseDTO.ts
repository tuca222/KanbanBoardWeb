import { Status } from "../../../../../Core/Entities/Card";

export interface IUpdateCardResponseDTO {
  nomeTarefa: string,
  descricao: string,
  conteudo: string,
  dataPrazo: string,
  status: Status
};