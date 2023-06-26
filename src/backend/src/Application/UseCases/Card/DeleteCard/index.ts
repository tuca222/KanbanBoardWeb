import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { CardService } from "../../../Services/Implementations/CardServices";
import { DeleteCardController } from "./Implementations/DeleteCardController";
import { DeleteCardUseCase } from "./Implementations/DeleteCardUseCase";


const mongoUsersRepository = new MongoUsersRepository();
const cardService = new CardService(mongoUsersRepository);

const deleteCardUseCase = new DeleteCardUseCase(
  mongoUsersRepository,
  cardService
);

const deleteCardController = new DeleteCardController(deleteCardUseCase);

export {deleteCardController};