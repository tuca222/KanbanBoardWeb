import { Status } from "../../../../../Core/Entities/Card";

export interface IReadCardResponseDTO {
  nomeTarefa: string,
  descricao: string,
  conteudo: string,
  dataPrazo: string,
  userNameCriador: string;
  status: Status
};