import { IUpdateUserRequestDTO } from "./IUpdateUserRequestDTO";

export interface IUpdateUserUseCase {
  execute(data:IUpdateUserRequestDTO): Promise<void>
}