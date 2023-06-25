import { User } from "../../../Core/Entities/User";

export interface IBoardService{
  createBoard(user: User);
  findBoardById(boardId: string);
  updateTituloBoard();
  shareBoard();
  updateEditor(userBD: User, newUserName: string): Promise<void>;
  updateCriadorCard(userBD: User, newUserName: string): Promise<void>;
  deleteBoard();
}