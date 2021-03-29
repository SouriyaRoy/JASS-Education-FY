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
    path : 'forum', loadChildren:() => import ('./forum/forum.module')
    .then(mod => mod.ForumModule)
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
