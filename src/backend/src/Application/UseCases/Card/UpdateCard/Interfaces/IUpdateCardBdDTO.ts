import { Status } from "../../../../../Core/Entities/Card";

export interface IUpdateCardBdDTO {
  nomeTarefa: string,
  descricao: string,
  conteudo: string,
  dataPrazo: string,
  status: Status
};