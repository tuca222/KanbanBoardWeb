import { Board } from "../../../Core/Entities/Board";
import { Card } from "../../../Core/Entities/Card";
import { User } from "../../../Core/Entities/User";
import { IUpdateCardBdDTO } from "../../UseCases/Card/UpdateCard/Interfaces/IUpdateCardBdDTO";

export interface ICardService {
  createCard(user: User, boardId: string): Promise<Card>;
  updateCard(board: Board, card: Card, updateCardDto: IUpdateCardBdDTO): Promise<Card>;
  updateCriadorCard(userBD: User, newUserName: string): Promise<void>;
}