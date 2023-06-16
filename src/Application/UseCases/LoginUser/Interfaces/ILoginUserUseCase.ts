import { ILoginUserRequestDTO } from "./ILoginUserRequestDTO";

export interface ILoginUserUseCase {
  execute(data: ILoginUserRequestDTO)
}