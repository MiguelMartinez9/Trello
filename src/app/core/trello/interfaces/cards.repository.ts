import { Cards } from './../entities/cards';


export abstract class CardsRepository {

    abstract createCard(cards: Cards): Promise<boolean>; 
    abstract getCard(idList:string): Promise<Cards[]>;
    abstract updateCard(updatedCard: Cards): Promise<boolean>;
    abstract deleteCard(card: Cards): Promise<boolean>; 

  }
