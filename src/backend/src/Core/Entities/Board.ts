const { v4: uuidv4 } = require('uuid');
import { Card } from "./Card";


export class Board{
  public readonly id: string;
  public titulo: string;
  public compartilhado: boolean;
  public editores: Array<string>;
  public cards: Array<Card>;

  constructor(props: Omit<Board, 'id'>, id?: string) {
    Object.assign(this, props)
    
    if(!id){
      this.id = uuidv4();
    }
  }
};