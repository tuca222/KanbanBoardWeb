import { Board } from "../../../Core/Entities/Board";
import { Card } from "../../../Core/Entities/Card";
import { User } from "../../../Core/Entities/User";
import { IUsersRepository } from "../../../Core/Repositories/IUsersRepository";
import { IUpdateCardBdDTO } from "../../UseCases/Card/UpdateCard/Interfaces/IUpdateCardBdDTO";
import { ICardService } from "../Interfaces/ICardService";
const { v4: uuidv4 } = require('uuid');

export class CardService implements ICardService {
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
        nomeTarefa: "Nova Tarefa ToDo",
        descricao: "Tarefa a Fazer.",
        conteudo: "Conteúdo da Tarefa",
        dataPrazo: "--/--/----",
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

  async updateCard(board: Board, card: Card, updateCardDTO: IUpdateCardBdDTO): Promise<Card> {
    try {
      const users = await this.usersRepository.findAllUsers();
      for (var i = 0; i <= (users.length - 1); i++) {
        let boardUserBd = users[i].boards.filter(b => b.id === board.id)[0];
        if (boardUserBd) {
          let cardUserBd = boardUserBd.cards.filter(c => c.id == card.id)[0];
          if (cardUserBd) {
            cardUserBd.nomeTarefa = updateCardDTO.nomeTarefa;
            cardUserBd.descricao = updateCardDTO.descricao;
            cardUserBd.conteudo = updateCardDTO.conteudo;
            cardUserBd.dataPrazo = updateCardDTO.dataPrazo;
            cardUserBd.status = updateCardDTO.status;
            card = cardUserBd;
            await this.usersRepository.saveUserUpdates(users[i]);
          };
        };
      };

      return card;
    } catch (Error) {
      throw Error;
    };
  };

  async updateCriadorCard(userBD: User, newUserName: string): Promise<void> {
    try{
      for (var i = 0; i <= (userBD.boards.length - 1); i++){
        for (var j = 0; j <= (userBD.boards[i].cards.length - 1); j++){
          if (userBD.boards[i].cards[j].userNameCriador === userBD.userName){
            userBD.boards[i].cards[j].userNameCriador = newUserName;
            await this.usersRepository.saveUserUpdates(userBD);
          };
        };
      };
    } catch(Error) {
      throw new Error("Erro ao atualizar o userName do Criador do Card!");
    };
  };

};