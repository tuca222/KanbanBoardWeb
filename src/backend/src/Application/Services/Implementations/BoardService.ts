const { v4: uuidv4 } = require('uuid');
import { Board } from "../../../Core/Entities/Board";
import { User } from "../../../Core/Entities/User";
import { IUsersRepository } from "../../../Core/Repositories/IUsersRepository";
import { IBoardService } from "../Interfaces/IBoardService";

export class BoardService implements IBoardService{
  constructor(
    private usersRepository: IUsersRepository
  ){}
  
  async createBoard(user: User): Promise<Board> {
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
  
  async updateTituloBoard(boardId: string, boardTitulo: string): Promise<void> {
    try{
      const users = await this.usersRepository.findAllUsers();
      for (var i = 0; i <= (users.length - 1); i++){
        const boardUserBd = users[i].boards.filter(b => b.id === boardId)[0];
        if (boardUserBd){
          boardUserBd.titulo = boardTitulo;
          await this.usersRepository.saveUserUpdates(users[i]);
        };
      };
    } catch (Error){
      throw Error
    };
  };

  async shareBoard(userDonoBoard: User, emailUser: string, boardId: string): Promise<void> {
    try{
      const emailUserExiste = await this.usersRepository.findByEmail(emailUser);
      if (!emailUserExiste){
        throw new Error('Email de usuário não encontrado no banco de dados!');
      };

      const jaPossuiAcessoBoard = emailUserExiste.boards.filter(b => b.id === boardId)[0];
      if (jaPossuiAcessoBoard) {
        throw new Error('Usuário já possui acesso a esse Board!');
      };

      const boardCompartilhado = userDonoBoard.boards.filter(b => b.id === boardId)[0];
      boardCompartilhado.compartilhado = true;
      emailUserExiste.boards.push(boardCompartilhado);

      await this.usersRepository.saveUserUpdates(emailUserExiste);
      await this.usersRepository.saveUserUpdates(userDonoBoard);
      
    } catch (Error){
      throw Error
    };
  };

  async updateDono(userBD: User, newUserName: string): Promise<void> {
    try{
      const users = await this.usersRepository.findAllUsers();

      for (var i = 0; i <= (users.length - 1); i++) {
        for(var j = 0; j <= (users[i].boards.length -1); j++){
          if (users[i].boards[j].dono === userBD.userName){
            users[i].boards[j].dono = newUserName;
            await this.usersRepository.saveUserUpdates(users[i])
          };
        };
      };
    } catch(Error) {
      throw new Error("Erro ao atualizar o userName do Criador!");
    };
  };

  async deleteBoard() {
    throw new Error("Method not implemented.");
  };
}