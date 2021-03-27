import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { TodosService } from 'src/app/shared/service/todos.service';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalCreateComponent>,
    public todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      completed: new FormControl(false, Validators.required)
    });
  }

  submitCreate() {
    console.log(this.form.value);
    this.todosService.createTodos(this.form.value).subscribe(() => {
      console.log('Created');
      this.dialogRef.close();
    })
  }
}
