import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
