import { Boards } from './../entities/boards';


export abstract class BoardsRepository {

    abstract createBoard(boards: Boards): Promise<boolean>; 
    abstract getBoard(): Promise<string>;
    abstract updateBoard(id: string, updatedBoards: Boards): Promise<boolean>;
    abstract deleteBoard(id: string): Promise<void>; 

  }
