import { IDeleteCardRequestDTO } from "./IDeleteCardRequestDTO";

export interface IDeleteCardUseCase {
  execute(data: IDeleteCardRequestDTO): Promise<void>;
}