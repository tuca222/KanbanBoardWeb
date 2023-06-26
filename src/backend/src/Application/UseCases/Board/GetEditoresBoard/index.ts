import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { BoardService } from "../../../Services/Implementations/BoardService";
import { GetEditoresBoardController } from "./Implementations/GetEditoresBoardController";
import { GetEditoresBoardUseCase } from "./Implementations/GetEditoresBoardUseCase";


const mongoUsersRepository = new MongoUsersRepository();
const boardService = new BoardService(mongoUsersRepository);

const getEditoresBoardUseCase = new GetEditoresBoardUseCase(
  mongoUsersRepository,
  boardService
);
const getEditoresBoardController = new GetEditoresBoardController(getEditoresBoardUseCase);

export {getEditoresBoardController};