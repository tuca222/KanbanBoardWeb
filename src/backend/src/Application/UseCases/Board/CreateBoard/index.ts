import { MongoUserBoardsRepository } from "../../../../Infra/Repositories/MongoUserBoardsRepository";
import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { BoardService } from "../../../Services/Implementations/BoardService";
import { CreateBoardController } from "./Implementations/CreateBoardController";
import { CreateBoardUseCase } from "./Implementations/CreateBoardUseCase";

const userRepository = new MongoUsersRepository()

const mongoUserBoardsRepository = new MongoUserBoardsRepository()
const boardServices = new BoardService(mongoUserBoardsRepository)

const createBoardUseCase = new CreateBoardUseCase(userRepository, boardServices)

const createBoardController = new CreateBoardController(createBoardUseCase);

export { createBoardController }