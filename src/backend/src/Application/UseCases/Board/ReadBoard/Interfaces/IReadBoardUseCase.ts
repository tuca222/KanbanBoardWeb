import { Board } from "../../../../../Core/Entities/Board";

export interface IReadBoardUseCase {
  execute(userId: string, boardId: string): Promise<Board>
}