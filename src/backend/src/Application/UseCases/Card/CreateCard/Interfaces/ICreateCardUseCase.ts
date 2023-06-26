import { Card } from "../../../../../Core/Entities/Card";

export interface ICreateCardUseCase {
  execute(userId: string, boardId: string): Promise<Card>;
}