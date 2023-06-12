const { v4: uuidv4 } = require('uuid');
import { Board } from "./Board";

export class User{
  public readonly _id?: string;
  public name: string;
  public email: string;
  public senha: string;
  public boards: Array<Board>;

  constructor(props: Omit<User, 'boards'>, id?: string){
    Object.assign(this, props);

    this.boards = [{
      id: uuidv4(),
      titulo: "Board Exemplo",
      dataCriacao: Date(),
      compartilhado: false,
      numeroAcessos: 0,
      nomeCriador: this.name,
      cards: [{
        id: uuidv4(),
        nomeTarefa: "Tarefa exemplo ToDo",
        descricao: "Exemplo de tarefa a fazer.",
        conteudo: "Passo a passo da tarefa",
        dataCriacao: Date(),
        emailUserCriador: this.email,
        status: 1,
      }, {
        id: uuidv4(),
        nomeTarefa: "Tarefa exemplo InProgress",
        descricao: "Exemplo de tarefa em progresso.",
        conteudo: "Passo a passo da tarefa",
        dataCriacao: Date(),
        emailUserCriador: this.email,
        status: 2,
      }, {
        id: uuidv4(),
        nomeTarefa: "Tarefa exemplo Testing",
        descricao: "Exemplo de tarefa em testes.",
        conteudo: "Passo a passo da tarefa",
        dataCriacao: Date(),
        emailUserCriador: this.email,
        status: 3,
      }, {
        id: uuidv4(),
        nomeTarefa: "Tarefa exemplo Done",
        descricao: "Exemplo de tarefa completa.",
        conteudo: "Passo a passo da tarefa realizada.",
        dataCriacao: Date(),
        emailUserCriador: this.email,
        status: 4,
      }]
    }]
  };
};