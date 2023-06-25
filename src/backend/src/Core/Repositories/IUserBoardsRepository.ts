import { User } from "../Entities/User";

export interface IUserBoardsRepository{
  updateEditor(user: User): Promise<void>;
  updateCriadorCard(user: User): Promise<void>;
};