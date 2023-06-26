import { IDeleteBoardRequestDTO } from "./IDeleteBoardRequestDTO";

export interface IDeleteBoardUseCase{
  execute(data: IDeleteBoardRequestDTO): Promise<void>
}