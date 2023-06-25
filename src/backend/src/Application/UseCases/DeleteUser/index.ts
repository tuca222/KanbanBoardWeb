import { MongoUsersRepository } from "../../../Infra/Repositories/MongoUsersRepository";
import { DeleteUserController } from "./Implementations/DeleteUserController";
import { DeleteUserUseCase } from "./Implementations/DeleteUserUseCase";

const mongoUserRepository = new MongoUsersRepository();

const deleteUserUseCase = new DeleteUserUseCase(
  mongoUserRepository
);

const deleteUserController = new DeleteUserController(
  deleteUserUseCase
);

export{deleteUserController};