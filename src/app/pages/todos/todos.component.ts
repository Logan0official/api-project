import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Todo } from '../../shared/model/todo.model'
import { TodosService } from 'src/app/shared/service/todos.service';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, AfterViewInit {
  todos: Todo[] = [];
  id: number;
  displayedColumns: string[] = ['id', 'title', 'completed', 'button'];
  dataSource;
  test: Todo[] = [];
  el = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
      this.dataSource = new MatTableDataSource<Todo>(this.todos);
      this.dataSource.paginator = this.paginator;
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

  elem(id) {
    console.log(id);
    this.el = id - 1;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
