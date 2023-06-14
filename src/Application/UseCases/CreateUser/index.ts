import { MongoUsersRepository } from "../../../Infra/Repositories/MongoUsersRepository";
import { CreateUserController } from "./Implementations/CreateUserController";
import { CreateUserCryptoPassword } from "./Implementations/CreateUserCryptoPassword";
import { CreateUserUseCase } from "./Implementations/CreateUserUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const createUserCryptoPassword = new CreateUserCryptoPassword();

const createUserUseCase = new CreateUserUseCase(
  mongoUsersRepository,
  createUserCryptoPassword
);

const createUserController = new CreateUserController(createUserUseCase);

export {createUserController};