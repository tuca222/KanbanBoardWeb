import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { ReadBoardController } from "./Implementations/ReadBoardController";
import { ReadBoardUseCase } from "./Implementations/ReadBoardUseCase";

const usersRepository = new MongoUsersRepository();
const readBoarUseCase = new ReadBoardUseCase(usersRepository);

const readBoardController = new ReadBoardController(readBoarUseCase);

export { readBoardController };