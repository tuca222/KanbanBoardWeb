import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { BoardService } from "../../../Services/Implementations/BoardService";
import { DeleteBoardController } from "./Implementations/DeleteBoardController";
import { DeleteBoardUseCase } from "./Implementations/DeleteBoardUseCase";

const usersRepository =  new MongoUsersRepository();
const boardService = new BoardService(usersRepository);

const deleteBoardUseCase = new DeleteBoardUseCase(usersRepository, boardService);

const deleteBoardController = new DeleteBoardController(deleteBoardUseCase);

export { deleteBoardController };