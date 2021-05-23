import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { TicketsComponent } from './tickets/tickets.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:'admin-home',
    component:AdminHomeComponent
  },
  {
    path:'user',
    component:UserComponent
  },
  {
    path : 'admin-cred', loadChildren:() => import ('./admin-credentials/admin-credentials.module')
    .then(mod => mod.AdminCredentialsModule)
  },
  {
    path : 'coordinators', loadChildren:() => import ('./coordinator/coordinator.module')
    .then(mod => mod.CoordinatorModule)
  },
  {
    path : 'subjects', loadChildren:() => import ('./subjects/subjects.module')
    .then(mod => mod.SubjectsModule)
  },
  {
    path:'tickets',
    component:TicketsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
