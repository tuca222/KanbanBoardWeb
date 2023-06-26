import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { BoardService } from "../../../Services/Implementations/BoardService";
import { UpdateBoardController } from "./Implementations/UpdateBoardController";
import { UpdateBoardUseCase } from "./Implementations/UpdateBoardUseCase";

const usersRepository = new MongoUsersRepository;
const boardService =  new BoardService(usersRepository);

const updateBoardUseCase = new UpdateBoardUseCase(usersRepository, boardService);

const updateBoardController = new UpdateBoardController(updateBoardUseCase);

export { updateBoardController };