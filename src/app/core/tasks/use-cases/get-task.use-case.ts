import { Task } from "../entities/task";
import { TaskRepository } from "../interfaces/task.repository";
import { Injectable } from "@angular/core";


export @Injectable({providedIn: 'root'})


class GetTaskUseCase {
   
   constructor (private repository : TaskRepository) {}

   async execute () : Promise <Task[]> {
      const task = await this.repository.getTask();
      return task;
   }
   
  }
  