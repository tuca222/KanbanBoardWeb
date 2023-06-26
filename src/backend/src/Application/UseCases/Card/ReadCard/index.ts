import { MongoUsersRepository } from "../../../../Infra/Repositories/MongoUsersRepository";
import { ReadCardController } from "./Implementations/ReadCardController";
import { ReadCardUseCase } from "./Implementations/ReadCardUseCase";


const mongoUsersRepository = new MongoUsersRepository();

const readCardUseCase = new ReadCardUseCase(
  mongoUsersRepository
);
const readCardController= new ReadCardController(readCardUseCase);

export {readCardController};