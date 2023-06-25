import { ICreateBoardResponseDTO } from "./ICreateBoardResponseDTO";

export interface ICreatBoardUseCase{
  execute(userId: string): Promise<ICreateBoardResponseDTO>
}