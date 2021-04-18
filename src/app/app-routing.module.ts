import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { ManageAccountComponent } from './pages/manage-account/manage-account.component';

const routes: Routes = [
  {
    path: 'todos',
    // component: TodosComponent,
    component: ManageAccountComponent
  },
  {
    path: 'user-detail/:id',
    component: EdituserComponent
  },
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
