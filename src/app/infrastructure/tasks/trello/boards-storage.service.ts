import { Injectable } from "@angular/core";
import { Boards } from "src/app/core/trello/entities/boards";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BoardsRepository } from "src/app/core/trello/interfaces/boards.repository";

@Injectable({providedIn: 'root'})

export class BoardsStorageService implements BoardsRepository{

    urlTrello = "https://api.trello.com/1/boards/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    }

    constructor(public http: HttpClient){}

    createBoard(boards: Boards): Promise<boolean> {
        
        const httpParams = new HttpParams()
            .set("name", boards.name)
            .set("key", boards.key)
            .set("token", boards.token)
    
        return this.http.post(this.urlTrello, httpParams, this.httpHeader)
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

    getBoard(): Promise<string> {
        const httpParams = new HttpParams()
            .set("key", "a09621d70aa7368f5ebd790b6ad8c733")
            .set("token", "ATTAd1475a5747181958f56c7bd016d154e3076c883ac5bb3e7417400a03536c2e23FF3C3AB7")
    
        return this.http.get<any>(this.urlTrello + "OwHi8Ect", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                const idBoard = response.id
                return idBoard
            })
            .catch((error) => {
                return error
            });
    }
    

    updateBoard(id: string, updatedBoards: Boards): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteBoard(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}