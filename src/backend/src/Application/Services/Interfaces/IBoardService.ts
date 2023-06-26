import { Board } from "../../../Core/Entities/Board";
import { User } from "../../../Core/Entities/User";

export interface IBoardService{
  createBoard(user: User): Promise<Board>;
  updateTituloBoard();
  shareBoard(userDonoBoard: User, emailUser: string, boardId: string): Promise<void>;
  updateDono(userBD: User, newUserName: string): Promise<void>;
  deleteBoard();
}