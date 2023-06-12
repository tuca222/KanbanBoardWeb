import { uuid } from 'uuidv4';
import { Cards } from "./Cards";


export class Board{
  public readonly id: string;
  public titulo: string;
  public dataCriacao: string;
  public compartilhado: boolean;
  public numeroAcessos: number;
  public nomeCriador: string;
  public cards: Array<Cards>;

  constructor(props: Omit<Board, 'id'>, id?: string) {
    Object.assign(this, props)
    
    if(!id){
      this.id = uuid();
    }
  }
};