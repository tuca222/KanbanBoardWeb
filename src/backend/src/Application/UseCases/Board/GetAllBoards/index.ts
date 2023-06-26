import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { GetAllBoardsController } from "./Implementations/GetAllBoardsController";
import { GetAllBoardsUseCase } from "./Implementations/GetAllBoardsUseCase";

const usersRepository = new MongoUsersRepository();
const getAllBoardsUseCase = new GetAllBoardsUseCase(usersRepository);

const getAllBoardsController = new GetAllBoardsController(getAllBoardsUseCase);

export { getAllBoardsController };
