import { MongoUsersRepository } from "../../../Infra/Repositories/MongoUsersRepository";
import { CryptPasswordService } from "../../Services/Implementations/CryptPasswordService";
import { CreateUserController } from "./Implementations/CreateUserController";
import { CreateUserUseCase } from "./Implementations/CreateUserUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const cryptPasswordService = new CryptPasswordService();

const createUserUseCase = new CreateUserUseCase(
  mongoUsersRepository,
  cryptPasswordService
);

const createUserController = new CreateUserController(createUserUseCase);

export {createUserController};