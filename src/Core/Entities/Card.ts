const { v4: uuidv4 } = require('uuid');

enum Status{
  ToDo = 1, 
  InProgress,
  Testing, 
  Done
};

export class Card{
  public readonly id: string;
  public nomeTarefa: string;
  public descricao: string;
  public conteudo: string;
  public dataCriacao: string;
  public emailUserCriador: string;
  public status: Status;

  constructor(props: Omit<Card, 'id'>, id?: string) {
    Object.assign(this, props)
    
    if(!id){
      this.id = uuidv4();
    }
  }
};