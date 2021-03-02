import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookieComponent } from './cookie/cookie.component'

const routes: Routes = [
  {
    path : 'users', loadChildren:() => import ('./users/users.module')
    .then(mod => mod.UsersModule)
    //lazy loading
  },
  {
    path : 'app-cookie',
    component : CookieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
