import { Task } from "../entities/task";
import { TaskRepository } from "../interfaces/task.repository";
import { Injectable } from "@angular/core";


export @Injectable({providedIn: 'root'})

class UpdateTaskUseCase {
    
    constructor (private repository : TaskRepository) {}

    async execute(taskId: string, nombre: string, descripcion: string, prioridad: string): Promise<Task> {
        
      const existingTask = await this.repository.getTaskById(taskId);
    
      if (!existingTask) {
        throw new Error("Tarea no encontrada")
      }
    
      existingTask.nombre = nombre;
      existingTask.descripcion = descripcion;
      existingTask.prioridad = prioridad;
    
      await this.repository.updateTask(existingTask.id, existingTask);
    
      return existingTask;
    }
      
}