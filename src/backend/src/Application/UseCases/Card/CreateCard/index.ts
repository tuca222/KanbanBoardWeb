import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { CardServices } from "../../../Services/Implementations/CardServices";
import { CreateCardController } from "./Implementations/CreateCardController";
import { CreateCardUseCase } from "./Implementations/CreateCardUseCase";


const mongoUsersRepository = new MongoUsersRepository();
const cardServices = new CardServices(mongoUsersRepository);

const createCardUseCase = new CreateCardUseCase(
  mongoUsersRepository,
  cardServices
);

const createCardController = new CreateCardController(createCardUseCase);

export {createCardController};