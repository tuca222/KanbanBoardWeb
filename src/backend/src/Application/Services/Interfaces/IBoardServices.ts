import { User } from "../../../Core/Entities/User";

export interface IBoardServices{
  updateEditor(userBD: User, newUserName: string): Promise<void>;
  updateCriadorCard(userBD: User, newUserName: string): Promise<void>;
}