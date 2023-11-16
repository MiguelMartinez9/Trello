import { BoardsRepository } from "../interfaces/boards.repository";
import { Injectable } from "@angular/core";


export @Injectable({providedIn: 'root'})

class GetBoardUseCase {

    constructor (private repository : BoardsRepository) {}

    async execute () : Promise<string> {

        try {
            // Llama al método getBoard del repositorio para obtener los tableros
            const idBoard = await this.repository.getBoard()
      
            // Comprueba si se obtuvieron tableros
            if (idBoard) {
                return idBoard
            } else {
              // Si no se encontraron tableros, puedes manejarlo de acuerdo a tus necesidades,
              // por ejemplo, lanzando una excepción o devolviendo un valor predeterminado.
              throw new Error("No se escontraron tableros")
            }
        } catch (error) {
            throw new Error("No se escontraron tableros") // Puedes lanzar la excepción o manejarla de otra manera.
        }
    }
}