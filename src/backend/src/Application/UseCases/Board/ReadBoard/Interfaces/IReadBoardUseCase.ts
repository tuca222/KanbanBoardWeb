import { IReadBoardResponseDTO } from "./IReadBoardResponseDTO";

export interface IReadBoardUseCase {
  execute(userId: string, boardId: string): Promise<IReadBoardResponseDTO>
}