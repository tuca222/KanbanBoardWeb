import { IUpdateCardRequestDTO } from "./IUpdateCardRequestDTO";
import { IUpdateCardResponseDTO } from "./IUpdateCardResponseDTO";

export interface IUpdateCardUseCase {
  execute(data: IUpdateCardRequestDTO): Promise<IUpdateCardResponseDTO>
}