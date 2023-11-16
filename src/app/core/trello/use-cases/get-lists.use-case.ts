import { Lists } from "../entities/lists";
import { ListsRepository } from "../interfaces/lists.repository";
import { Injectable } from "@angular/core";


export @Injectable({providedIn: 'root'})

class GetListsUseCase {

    constructor (private repository : ListsRepository) {}

    async execute () : Promise<Lists[]> {

        try {
            // Llama al método getBoard del repositorio para obtener los tableros
            const lists = await this.repository.getLists()
      
            // Comprueba si se obtuvieron tableros
            if (lists) {
                return lists
            } else {
              // Si no se encontraron tableros, puedes manejarlo de acuerdo a tus necesidades,
              // por ejemplo, lanzando una excepción o devolviendo un valor predeterminado.
              throw new Error("No se escontraron listas")
            }
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la obtención de los tableros.
            console.error("Error al obtener listas:", error)
            throw error // Puedes lanzar la excepción o manejarla de otra manera.
        }
    }
}