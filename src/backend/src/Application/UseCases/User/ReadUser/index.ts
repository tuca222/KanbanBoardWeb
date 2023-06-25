import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { ReadUserController } from "./Implementations/ReadUserController";
import { ReadUserUseCase } from "./Implementations/ReadUserUseCase";

const mongoUserRepository = new MongoUsersRepository();
const readUserUseCase = new ReadUserUseCase(mongoUserRepository);

const readUserController = new ReadUserController(readUserUseCase);

export {readUserController}