import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskRepository } from './core/tasks/interfaces/task.repository';
import { CardsRepository } from './core/trello/interfaces/cards.repository';
import { TaskStorageService } from './infrastructure/tasks/task-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { CardsStorageService } from './infrastructure/tasks/trello/cards-storage.service';
import { BoardsStorageService } from './infrastructure/tasks/trello/boards-storage.service';
import { BoardsRepository } from './core/trello/interfaces/boards.repository';
import { ListsRepository } from './core/trello/interfaces/lists.repository';
import { ListsStorageService } from './infrastructure/tasks/trello/lists-storage.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: TaskRepository, useClass: TaskStorageService},
    { provide: CardsRepository, useClass: CardsStorageService},
    { provide: BoardsRepository, useClass: BoardsStorageService},
    { provide: ListsRepository, useClass: ListsStorageService},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
