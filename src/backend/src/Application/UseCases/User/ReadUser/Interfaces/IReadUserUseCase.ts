import { IReadUserUseCaseResponseDTO } from "./IReadUserResponseDTO";

export interface IReadUserUseCase {
  execute(userId: string): Promise<IReadUserUseCaseResponseDTO>
}