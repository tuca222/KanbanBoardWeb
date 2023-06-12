enum Status{
  ToDo = 1, 
  InProgress,
  Testing, 
  Done
};

export class Cards{
  public nomeTarefa: string;
  public descricao: string;
  public conteudo: string;
  public dataCriacao: string;
  public emailUserCriador: string;
  public status: Status;
};