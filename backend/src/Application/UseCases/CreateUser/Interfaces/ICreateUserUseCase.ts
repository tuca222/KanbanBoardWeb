import { ICreateUserRequestDTO } from "./ICreateUserDTO";

export interface ICreateUserUseCase{
  execute(data: ICreateUserRequestDTO): Promise<void>;
}