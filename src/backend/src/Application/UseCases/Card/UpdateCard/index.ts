import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { CardService } from "../../../Services/Implementations/CardServices";
import { UpdateCardController } from "./Implementations/UpdateCardController";
import { UpdateCardUseCase } from "./Implementations/UpdateCardUseCase";


const mongoUsersRepository = new MongoUsersRepository();
const cardService = new CardService(mongoUsersRepository);

const updateCardUseCase = new UpdateCardUseCase(
  mongoUsersRepository,
  cardService
);

const updateCardController= new UpdateCardController(updateCardUseCase);

export {updateCardController};