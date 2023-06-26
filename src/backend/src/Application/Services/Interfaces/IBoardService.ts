import { Board } from "../../../Core/Entities/Board";
import { User } from "../../../Core/Entities/User";

export interface IBoardService{
  createBoard(user: User): Promise<Board>;
  updateTituloBoard(boardId: string, boardTitulo: string): Promise<void>;
  shareBoard(userDonoBoard: User, emailUser: string, boardId: string): Promise<void>;
  getEditores(boardId: string): Promise<Array<string>>;
  updateDono(userBD: User, newUserName: string): Promise<void>;
  deleteBoard(boardId: string): Promise<void>;
}