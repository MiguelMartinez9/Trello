import { Cards } from "../entities/cards";
import { CardsRepository } from "../interfaces/cards.repository";
import { Injectable } from "@angular/core";


export @Injectable({providedIn: 'root'})

class DeleteCardUseCase {

    constructor (private repository : CardsRepository) {}

    async execute (id:string) : Promise <Cards> {

        const card = new Cards()
        card.id = id

        await this.repository.deleteCard(card);
        return card;

    }
}