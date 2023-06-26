import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { BoardService } from "../../../Services/Implementations/BoardService";
import { CardService } from "../../../Services/Implementations/CardServices";
import { CryptPasswordService } from "../../../Services/Implementations/CryptPasswordService";
import { UpdateUserController } from "./Implementations/UpdateUserController";
import { UpdateUserUseCase } from "./Implementations/UpdateUserUseCase";

const mongoUserRepository = new MongoUsersRepository();

const boardService = new BoardService(mongoUserRepository);
const cardService = new CardService(mongoUserRepository);

const cryptPasswordService = new CryptPasswordService();

const updateUserUseCase = new UpdateUserUseCase(mongoUserRepository, cryptPasswordService, boardService, cardService);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController }