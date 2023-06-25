import { Card } from "../../../Core/Entities/Card";
import { User } from "../../../Core/Entities/User";
import { IUsersRepository } from "../../../Core/Repositories/IUsersRepository";
import { ICardService } from "../Interfaces/ICardServices";
const { v4: uuidv4 } = require('uuid');

export class CardServices implements ICardService {
  constructor(
    private usersRepository: IUsersRepository
  ) {}
  async createCard(user: User, boardId: string): Promise<Card> {
    try {
      const board = user.boards.filter(b => b.id === boardId)[0];
      if (!board) {
        throw new Error('Board com este id nao encontrado na lista de boards deste usuario')
      }
      const cardProps = {
        id: uuidv4(),
        nomeTarefa: "Tarefa exemplo ToDo",
        descricao: "Exemplo de tarefa a fazer.",
        conteudo: "Passo a passo da tarefa",
        dataPrazo: null,
        userNameCriador: user.userName,
        status: 1,
      }
      const card = new Card(cardProps);
      board.cards.push(card);
      await this.usersRepository.saveUserUpdates(user);

      return card;
    } catch (Error) {
      throw Error;
    };
  };

}