import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { CryptPasswordService } from "../../../Services/Implementations/CryptPasswordService";
import { UpdateUserController } from "./Implementations/UpdateUserController";
import { UpdateUserUseCase } from "./Implementations/UpdateUserUseCase";

const mongoUserRepository = new MongoUsersRepository();
const cryptPasswordService = new CryptPasswordService();
const updateUserUseCase = new UpdateUserUseCase(mongoUserRepository, cryptPasswordService);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController }