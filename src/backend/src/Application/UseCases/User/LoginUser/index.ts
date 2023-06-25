import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { CryptPasswordService } from "../../../Services/Implementations/CryptPasswordService";
import { LoginUserController } from "./Implementations/LoginUserController";
import { LoginUserUseCase } from "./Implementations/LoginUserUseCase";

const mongoUserRepository = new MongoUsersRepository();
const cryptPasswordService = new CryptPasswordService();

const loginUserUseCase = new LoginUserUseCase(
  mongoUserRepository,
  cryptPasswordService
);

const loginUserController = new LoginUserController(
  loginUserUseCase
);

export{loginUserController};
