import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './admin/admin.component'
import {StudentComponent} from './student/student.component'
import {TeacherCoordinatorComponent} from './teacher-coordinator/teacher-coordinator.component'

const routes: Routes = [
  {
    path : 'admin',
    component : AdminComponent
  },
  {
    path : 'student',
    component : StudentComponent
  },
  {
    path : 'teacher',
    component: TeacherCoordinatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
