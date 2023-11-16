import { Injectable } from "@angular/core";
import { Cards } from "src/app/core/trello/entities/cards";
import { CardsRepository } from "src/app/core/trello/interfaces/cards.repository";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class CardsStorageService implements CardsRepository{

    urlTrello = "https://api.trello.com/1/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    };

    constructor(
        public http: HttpClient
    ){}
    
    createCard(cards: Cards): Promise<boolean> {
        const httpParams = new HttpParams()
            .set("idList", cards.idList)
            .set("key", cards.key)
            .set("token", cards.token)
            .set("name", cards.name)
    
        return this.http.post(this.urlTrello + "cards", httpParams, this.httpHeader)
            .toPromise()
            .then(() => {
                console.log("confirm");
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    async getCard(idList:string): Promise<Cards[]> {
        //const idBoard = await this.getCardsUseCase.execute()

        const httpParams = new HttpParams()
            .set("key", "a09621d70aa7368f5ebd790b6ad8c733")
            .set("token", "ATTAd1475a5747181958f56c7bd016d154e3076c883ac5bb3e7417400a03536c2e23FF3C3AB7")
    
        return this.http.get<Cards[]>(this.urlTrello + "lists/" + idList + "/cards", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                //const listNames = response?.map((list) => list.name);
                return response;
            })
            .catch((error) => {
                console.log(error)
                return error
            });
    }

    updateCard(updatedCards: Cards): Promise<boolean> {
        const httpParams = new HttpParams()
            .set("key", updatedCards.key)
            .set("token", updatedCards.token)
            .set("name", updatedCards.name)
            .set("desc", updatedCards.desc)
    
        return this.http.put(this.urlTrello + "cards/" + updatedCards.id, httpParams, this.httpHeader)
            .toPromise()
            .then(() => {
                console.log("confirm");
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    async deleteCard(card: Cards): Promise<boolean> {
        const httpParams = new HttpParams()
            .set("key", card.key)
            .set("token", card.token)
    
        try {
            await this.http.delete(this.urlTrello + "cards/" + card.id, { params: httpParams, headers: { "Accept": "application/json" }})
                .toPromise();
            console.log("confirm");
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
}