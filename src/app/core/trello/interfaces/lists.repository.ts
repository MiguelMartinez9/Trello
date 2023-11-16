import { Lists } from './../entities/lists';


export abstract class ListsRepository {

    abstract createList(lists: Lists): Promise<boolean>; 
    abstract getLists(): Promise<Lists[]>;
    abstract updateList(id: string, updatedBoards: Lists): Promise<boolean>;
    abstract deleteList(id: string): Promise<void>; 

  }
