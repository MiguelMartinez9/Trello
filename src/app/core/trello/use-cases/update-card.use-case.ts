import { Cards } from "../entities/cards";
import { CardsRepository } from "../interfaces/cards.repository";
import { Injectable } from "@angular/core";


export @Injectable({providedIn: 'root'})

class UpdateCardUseCase {

    constructor (private repository : CardsRepository) {}

    async execute (id:string, name:string, descripcion:string) : Promise <Cards> {

        const card = new Cards()
        card.id = id
        card.name = name
        card.desc = descripcion

        await this.repository.updateCard(card);
        return card;

    }
}