import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Todo } from 'src/app/shared/model/todo.model';
import { TodosService } from 'src/app/shared/service/todos.service';
import { DialogData } from '../todos/todos.component';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {
  id: number;
  todo: Todo;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalEditComponent>,
    public todosService: TodosService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.todosService.findTodos(this.id).subscribe((data: Todo) => {
      this.todo = data;
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      completed: new FormControl('', Validators.required)
    });
  }

  submitUpdate() {
    console.log(this.form.value);
    this.todosService.updateTodos(this.id, this.form.value).subscribe(() => {
      console.log('Updated');
      this.dialogRef.close();
    })
  }
}
