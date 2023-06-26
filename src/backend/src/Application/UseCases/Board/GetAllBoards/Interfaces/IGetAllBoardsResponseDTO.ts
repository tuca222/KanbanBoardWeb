import { IBoardDTO } from "./IBoardDTO";

export interface IGetAllBoardsResponseDTO{
  userName: string,
  boardDTO: Array<IBoardDTO>
};