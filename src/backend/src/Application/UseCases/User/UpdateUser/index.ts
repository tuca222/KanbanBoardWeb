import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { BoardService } from "../../../Services/Implementations/BoardService";
import { CryptPasswordService } from "../../../Services/Implementations/CryptPasswordService";
import { UpdateUserController } from "./Implementations/UpdateUserController";
import { UpdateUserUseCase } from "./Implementations/UpdateUserUseCase";

const mongoUserRepository = new MongoUsersRepository();

const boardServices = new BoardService(mongoUserRepository)

const cryptPasswordService = new CryptPasswordService();

const updateUserUseCase = new UpdateUserUseCase(mongoUserRepository, cryptPasswordService, boardServices);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController }