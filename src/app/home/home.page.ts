import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { GetTaskUseCase } from './../core/tasks/use-cases/get-task.use-case'
import { CreateTaskUseCase } from './../core/tasks/use-cases/create-task.use-case'
import { CreateCardUseCase } from './../core/trello/use-cases/create-card.use-case'
import { UpdateTaskUseCase } from './../core/tasks/use-cases/update-task.use-case'
import { DeleteTaskUseCase } from './../core/tasks/use-cases/delete-task.use-case'
import { GetBoardUseCase } from '../core/trello/use-cases/get-board.use-case';
import { GetListsUseCase } from '../core/trello/use-cases/get-lists.use-case';
import { Lists } from '../core/trello/entities/lists';
import { Cards } from '../core/trello/entities/cards';
import { GetCardsUseCase } from '../core/trello/use-cases/get-cards.use-case';
import { UpdateCardUseCase } from '../core/trello/use-cases/update-card.use-case';
import { DeleteCardUseCase } from '../core/trello/use-cases/delete-card.use-case';

interface tarea {
  id: string;
  nombre: string,
  descripcion: string,
  prioridad: string;
  estado:boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal)modal!: IonModal
  tareas: tarea[] = []

  tareaEditada: tarea | null = null
  tareaEditadaTrello: Cards | null = null
  nombre: string = ""
  descripcion: string = ""
  prioridad: string = ""
  trello:boolean = false
  trelloEdit: boolean = false
  lista: Lists[] = []
  idboard: string = ""
  opListaTrello: string = ""
  vistaTarjetas:string = "local"
  tarjetasTrello: Cards[] = []
  idCard: string = ""
  
  constructor(
    private getTaskUseCase: GetTaskUseCase, 
    private createTaskUseCase: CreateTaskUseCase, 
    private createCardUseCase: CreateCardUseCase, 
    private updateTaskUseCase: UpdateTaskUseCase, 
    private deleteTaskUseCase: DeleteTaskUseCase,
    private getListsUseCase: GetListsUseCase,
    private getCardsUseCase: GetCardsUseCase,
    private updateCardsUseCase: UpdateCardUseCase,
    private deleteCardsUseCase: DeleteCardUseCase,
  ) {}

  async ngOnInit() {
    this.tareas = (await this.getTaskUseCase.execute())
    this.lista = (await this.getListsUseCase.execute())
  }

  openModal() {
    this.trello = false
    this.trelloEdit = false
    this.tareaEditada = null
    this.tareaEditadaTrello = null
    this.nombre = "";
    this.descripcion = "";
    this.prioridad = "";
    this.opListaTrello = "";
    this.modal.present()
  }

  openTrello() {
    this.trello = true
    this.trelloEdit = false
    this.tareaEditada = null
    this.tareaEditadaTrello = null
    this.nombre = "";
    this.descripcion = "";
    this.prioridad = "";
    this.opListaTrello = "";
    this.modal.present()
  }

  cancelModal() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirmModal() {

    if(this.trello) {
      if(this.tareaEditadaTrello) {
        await this.updateCardsUseCase.execute(this.idCard, this.nombre, this.descripcion)
        this.tarjetasTrello = (await this.getCardsUseCase.execute(this.tareaEditadaTrello.idList))
      } else {
        await this.createCardUseCase.execute(this.nombre, this.opListaTrello)
        this.tarjetasTrello = (await this.getCardsUseCase.execute(this.opListaTrello))
      }
    } else {
      if (this.tareaEditada) {
        /* this.tareaEditada.nombre = this.nombre;
        this.tareaEditada.descripcion = this.descripcion;
        this.tareaEditada.prioridad = this.prioridad; */
        await this.updateTaskUseCase.execute(this.tareaEditada.id ,this.nombre, this.descripcion, this.prioridad);
        this.tareas = (await this.getTaskUseCase.execute());
      }
      else {
        await this.createTaskUseCase.execute(this.nombre, this.descripcion, this.prioridad);
        this.tareas = (await this.getTaskUseCase.execute());
      }
    }

    //LIMPIAR LOS DATOS
    this.nombre = "";
    this.descripcion = "";
    this.prioridad = "";
    this.opListaTrello = "";

    this.modal.dismiss(null, 'confirm');
  }

  async eliminarTarea(id: string) {
    await this.deleteTaskUseCase.execute(id)
    this.tareas = (await this.getTaskUseCase.execute());
  }

  async eliminarTarjeta(card: Cards) {
    await this.deleteCardsUseCase.execute(card.id)
    this.tarjetasTrello = (await this.getCardsUseCase.execute(card.idList));
  }

  editarTarea(item: tarea) {
    this.trello = false
    this.trelloEdit = false
    this.tareaEditada = item;
    this.nombre = item.nombre;
    this.descripcion = item.descripcion;
    this.prioridad = item.prioridad;
    this.modal.present();
   
  }

  editarTarjetaTrello(item: Cards) {
    this.trello = true
    this.trelloEdit = true
    this.tareaEditadaTrello = item
    this.idCard = item.id
    this.nombre = item.name
    this.descripcion = item.desc
    this.modal.present();
  }

  async obtenerTarjetasPorListas(idList:string) {
    this.tarjetasTrello = ( await this.getCardsUseCase.execute(idList))
  }


}
