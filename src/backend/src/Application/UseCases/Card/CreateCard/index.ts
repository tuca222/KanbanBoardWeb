import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { CardService } from "../../../Services/Implementations/CardServices";
import { CreateCardController } from "./Implementations/CreateCardController";
import { CreateCardUseCase } from "./Implementations/CreateCardUseCase";


const mongoUsersRepository = new MongoUsersRepository();
const cardServices = new CardService(mongoUsersRepository);

const createCardUseCase = new CreateCardUseCase(
  mongoUsersRepository,
  cardServices
);

const createCardController = new CreateCardController(createCardUseCase);

export {createCardController};