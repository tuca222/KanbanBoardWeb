import { IReadCardRequestDTO } from "./IReadCardRequestDTO";
import { IReadCardResponseDTO } from "./IReadCardResponseDTO";

export interface IReadCardUseCase {
  execute(data: IReadCardRequestDTO): Promise<IReadCardResponseDTO>;
}