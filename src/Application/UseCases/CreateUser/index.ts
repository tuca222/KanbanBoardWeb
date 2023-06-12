import { MongoUsersRepository } from "../../../Infra/Repositories/MongoUsersRepository";
import { CreateUserController } from "./Implementations/CreateUserController";
import { CreateUserCryptoPassword } from "./Implementations/CreateUserCryptoPassword";
import { CreateUserToken } from "./Implementations/CreateUserToken";
import { CreateUserUseCase } from "./Implementations/CreateUserUseCase";

const mongoUsersRepository = new MongoUsersRepository();
const createUserCryptoPassword = new CreateUserCryptoPassword();
const createUserToken = new CreateUserToken();

const createUserUseCase = new CreateUserUseCase(
  mongoUsersRepository,
  createUserCryptoPassword,
  createUserToken
);

const createUserController = new CreateUserController(createUserUseCase);

export {createUserController};