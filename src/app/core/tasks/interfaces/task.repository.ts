import { Task } from './../entities/task';


export abstract class TaskRepository {

    abstract createTask(task: Task): Promise<void>; 
    abstract getTask(): Promise<Task[]>;
    abstract getTaskById(id: string): Promise <Task | null>; 
    abstract updateTask(id: string, updatedTask: Task): Promise<boolean>;
    abstract deleteTask(id: string): Promise<void>; 

  }
