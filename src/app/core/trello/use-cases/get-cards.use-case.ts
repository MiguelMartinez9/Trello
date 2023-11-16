import { Cards } from "../entities/cards";
import { CardsRepository } from "../interfaces/cards.repository";
import { Injectable } from "@angular/core";


export @Injectable({providedIn: 'root'})

class GetCardsUseCase {

    constructor (private repository: CardsRepository) {}

    async execute (idList:string) : Promise<Cards[]> {

        try {
            // Llama al método getBoard del repositorio para obtener los tableros
            const cards = await this.repository.getCard(idList)
      
            // Comprueba si se obtuvieron tableros
            if (cards) {
                return cards
            } else {
              // Si no se encontraron tableros, puedes manejarlo de acuerdo a tus necesidades,
              // por ejemplo, lanzando una excepción o devolviendo un valor predeterminado.
              throw new Error("No se escontraron tarjetas")
            }
        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la obtención de los tableros.
            console.error("Error al obtener tarjetas:", error)
            throw error // Puedes lanzar la excepción o manejarla de otra manera.
        }
    }
}