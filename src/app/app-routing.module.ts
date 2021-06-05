import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path : 'dashboard', loadChildren:() => import ('./dashboard/dashboard.module')
    .then(mod => mod.DashboardModule)
  },
  {
    path : 'views', loadChildren:() => import ('./views/views.module')
    .then(mod => mod.ViewsModule)
  },
  {
    path:'admin-panel', loadChildren:() => import('./admin-panel/admin-panel.module')
    .then(mod => mod.AdminPanelModule)
  },
  {
    path:'courses', loadChildren:() => import('./courses/courses.module')
    .then(mod => mod.CoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
