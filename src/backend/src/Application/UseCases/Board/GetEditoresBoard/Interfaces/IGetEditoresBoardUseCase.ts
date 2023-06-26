import { IGetEditoresBoardRequestDTO } from "./IGetEditoresBoardRequestDTO";

export interface IGetEditoresBoardUseCase {
  execute(data: IGetEditoresBoardRequestDTO): Promise<Array<string>>;
}