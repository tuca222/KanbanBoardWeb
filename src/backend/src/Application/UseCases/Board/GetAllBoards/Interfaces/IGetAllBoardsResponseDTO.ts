import { IBoardDTO } from "./IBoardDTO";

export interface IGetAllBoardsResponseDTO{
  userName: string,
  boards: Array<IBoardDTO>
};