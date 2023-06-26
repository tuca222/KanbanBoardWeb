import { IUpdateBoardRequestDTO } from "./IUpdateBoardRequestDTO";

export interface IUpdateBoardUseCase {
  execute(data: IUpdateBoardRequestDTO): Promise<string>
}