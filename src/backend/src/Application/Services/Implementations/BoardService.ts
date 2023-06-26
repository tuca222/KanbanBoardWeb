const { v4: uuidv4 } = require('uuid');
import { Board } from "../../../Core/Entities/Board";
import { User } from "../../../Core/Entities/User";
import { IUsersRepository } from "../../../Core/Repositories/IUsersRepository";
import { IBoardService } from "../Interfaces/IBoardService";

export class BoardService implements IBoardService{
  constructor(
    private usersRepository: IUsersRepository
  ){}
  
  async createBoard(user: User) {
    try {
      const boardProps = {
        id: uuidv4(),
        titulo: "Novo Board",
        compartilhado: false,
        dono: user.userName,
        cards: [{
          id: uuidv4(),
          nomeTarefa: "Nova Tarefa ToDo",
          descricao: "Tarefa a Fazer.",
          conteudo: "Conteúdo da Tarefa",
          dataPrazo: "--/--/----",
          userNameCriador: user.userName,
          status: 1,
        }, {
          id: uuidv4(),
          nomeTarefa: "Nova Tarefa InProgress",
          descricao: "Tarefa em Progresso.",
          conteudo: "Conteúdo da Tarefa",
          dataPrazo: "--/--/----",
          userNameCriador: user.userName,
          status: 2,
        }, {
          id: uuidv4(),
          nomeTarefa: "Tarefa Testing",
          descricao: "Tarefa em Teste.",
          conteudo: "Conteúdo da tarefa",
          dataPrazo: "--/--/----",
          userNameCriador: user.userName,
          status: 3,
        }]
      };
      const board = new Board(boardProps);

      user.boards.push(board);

      await this.usersRepository.saveUserUpdates(user);

      return board;

    } catch (Error) {
      throw new Error("Erro ao criar Board!");
    };
  };

  async findBoardById(boardId: string) {
    throw new Error("Method not implemented.");
  };
  
  async updateTituloBoard() {
    throw new Error("Method not implemented.");
  };

  async shareBoard() {
    throw new Error("Method not implemented.");
  };

  async updateEditor(userBD: User, newUserName: string): Promise<void> {
    try{
      for (var i = 0; i <= (userBD.boards.length - 1); i++){
        if (userBD.boards[i].dono === userBD.userName){
          userBD.boards[i].dono = newUserName;
          await this.usersRepository.saveUserUpdates(userBD);
        };
      };
    } catch(Error) {
      throw new Error("Erro ao atualizar o userName do Editor!");
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

  async deleteBoard() {
    throw new Error("Method not implemented.");
  };
}