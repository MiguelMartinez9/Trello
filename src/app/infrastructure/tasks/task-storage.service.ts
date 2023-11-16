import { Injectable } from "@angular/core";
import { Task } from "src/app/core/tasks/entities/task";
import { TaskRepository } from "src/app/core/tasks/interfaces/task.repository";
import { Preferences } from "@capacitor/preferences";

const COLLECTION = 'TASK';

@Injectable({providedIn: 'root'})

export class TaskStorageService implements TaskRepository{

    async  createTask(task: Task) {
        await Preferences.set({
            key: COLLECTION + "-" + task.id , 
            value: JSON.stringify(task)
        });
    }

    async getTask(): Promise<Task[]> {
        const collection = await Preferences.keys();
        const task: Task[] = [];

        collection.keys.filter(key => key.startsWith(COLLECTION))
        .forEach(async key => {
            const data  = (await Preferences.get({key})).value;
            if(data) task.push(JSON.parse(data));
        })
                                                                                         
        return task;
    }

    async getTaskById(id: string): Promise<Task | null> {
        const collection = await Preferences.keys();
      
        for (const key of collection.keys) {
          if (key.startsWith(COLLECTION)) {
            const data = (await Preferences.get({ key })).value
            if (data) {
              const task = JSON.parse(data)
              if (task.id === id) {
                return task
              }
            }
          }
        }
      
        return null
    }      

    async updateTask(id: string, updatedTask: Task): Promise<boolean> {

        const taskId = id;
        const key = COLLECTION + "-" + taskId;
        const existingData = (await Preferences.get({ key })).value;

        if (!existingData) {
            throw new Error(`Tarea con ID ${taskId} no encontrada`)
        }

        await Preferences.set({
            key,
            value: JSON.stringify(updatedTask)
        });

        return true;
    }
    
    async deleteTask(id: string): Promise<void> {
        const key = COLLECTION + "-" + id;

        const existingData = (await Preferences.get({ key })).value;
        
        if (!existingData) {
            throw new Error(`Tarea con ID ${id} no encontrada`);
        }

        await Preferences.remove({ key });
    }
    
}