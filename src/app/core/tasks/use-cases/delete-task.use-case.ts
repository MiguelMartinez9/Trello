import { Task } from "../entities/task";
import { TaskRepository } from "../interfaces/task.repository";
import { Injectable } from "@angular/core";


export @Injectable({providedIn: 'root'})

class DeleteTaskUseCase {
    
    constructor (private repository : TaskRepository) {}

    async execute(taskId: string): Promise<void> {
       
        const existingTask = await this.repository.getTaskById(taskId);
        
        if (!existingTask) {
            throw new Error(`Tarea con ID ${taskId} no encontrada.`);
        }

        return await this.repository.deleteTask(taskId)
    }
      
}