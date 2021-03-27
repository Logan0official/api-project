import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalCreateComponent } from './pages/modal-create/modal-create.component';
import { ModalEditComponent } from './pages/modal-edit/modal-edit.component';
import { TodosComponent } from './pages/todos/todos.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
  },
  { path: 'todos/create', component: ModalCreateComponent },
  { path: 'todo/:id/edit', component: ModalEditComponent },
  {
    path: '**',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
