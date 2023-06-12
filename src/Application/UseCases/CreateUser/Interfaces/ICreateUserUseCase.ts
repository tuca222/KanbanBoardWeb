import { Response } from "express";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";

export interface ICreateUserUseCase{
  execute(data: ICreateUserRequestDTO): Promise<Response>;
}