import { User } from "../../../Core/Entities/User";

export interface IBoardService{
  createBoard(user: User);
  updateTituloBoard();
  shareBoard();
  updateEditor(userBD: User, newUserName: string): Promise<void>;
  updateCriadorCard(userBD: User, newUserName: string): Promise<void>;
  deleteBoard();
}