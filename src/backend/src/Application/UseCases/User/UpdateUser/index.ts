import { MongoUserBoardsRepository } from "../../../../Infra/Repositories/MongoUserBoardsRepository";
import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { BoardServices } from "../../../Services/Implementations/BoardServices";
import { CryptPasswordService } from "../../../Services/Implementations/CryptPasswordService";
import { UpdateUserController } from "./Implementations/UpdateUserController";
import { UpdateUserUseCase } from "./Implementations/UpdateUserUseCase";

const mongoUserRepository = new MongoUsersRepository();
const mongoUserBoardsRepository = new MongoUserBoardsRepository()

const boardServices = new BoardServices(mongoUserBoardsRepository)

const cryptPasswordService = new CryptPasswordService();

const updateUserUseCase = new UpdateUserUseCase(mongoUserRepository, cryptPasswordService, boardServices);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController }