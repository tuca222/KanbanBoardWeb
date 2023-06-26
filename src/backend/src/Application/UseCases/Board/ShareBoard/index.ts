import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { BoardService } from "../../../Services/Implementations/BoardService";
import { ShareBoardController } from "./Implementations/ShareBoardController";
import { ShareBoardUseCase } from "./Implementations/ShareBoardUseCase";

const usersRepository = new MongoUsersRepository();
const boardService = new BoardService(usersRepository);

const shareBoarsUseCase = new ShareBoardUseCase(usersRepository, boardService);

const shareBoardController = new ShareBoardController(shareBoarsUseCase);

export { shareBoardController };