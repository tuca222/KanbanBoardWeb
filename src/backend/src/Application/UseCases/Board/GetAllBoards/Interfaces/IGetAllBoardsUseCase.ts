import { IGetAllBoardsResponseDTO } from "./IGetAllBoardsResponseDTO";

export interface IGetAllBoardsUseCase{
  execute(userId: string): Promise<IGetAllBoardsResponseDTO>
}