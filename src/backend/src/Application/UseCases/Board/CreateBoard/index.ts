import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { BoardService } from "../../../Services/Implementations/BoardService";
import { CreateBoardController } from "./Implementations/CreateBoardController";
import { CreateBoardUseCase } from "./Implementations/CreateBoardUseCase";

const userRepository = new MongoUsersRepository();

const boardServices = new BoardService(userRepository);

const createBoardUseCase = new CreateBoardUseCase(userRepository, boardServices);

const createBoardController = new CreateBoardController(createBoardUseCase);

export { createBoardController };