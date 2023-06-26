import { Card } from "../../../Core/Entities/Card";
import { User } from "../../../Core/Entities/User";

export interface ICardService {
  createCard(user: User, boardId: string): Promise<Card>;
}