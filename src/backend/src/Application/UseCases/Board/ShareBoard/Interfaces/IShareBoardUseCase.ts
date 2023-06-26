import { IShareBoardRequestDTO } from "./IShareBoardRequestDTO";

export interface IShareBoardUseCase{
  execute(data: IShareBoardRequestDTO): Promise<void>
}