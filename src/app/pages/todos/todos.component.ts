import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Todo } from '../../shared/model/todo.model'
import { TodosService } from 'src/app/shared/service/todos.service';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  id: number;

  constructor(
    private todosService: TodosService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todosService.getTodos().subscribe((todos: Todo[]) => {
      console.log(todos);
      this.todos = todos;
    });
  }

  deleteTodos(id) {
    this.todosService.deleteTodos(id).subscribe(() => {
      this.todos = this.todos.filter(item => item.id !== id);
      console.log('Deleted');
    })
  }

  modalCreate(): void {
    this.dialog.open(ModalCreateComponent, {
      width: '500px',
    });
  }

  modalUpdate(id): void {
    this.id = id;
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '500px',
      data: { id: this.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onReload() {
    window.location.reload();
  }
}
