import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StudentComponent } from './student/student.component';
import { TeacherCoordinatorComponent } from './teacher-coordinator/teacher-coordinator.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [StudentComponent, TeacherCoordinatorComponent, AdminComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    StudentComponent,
    TeacherCoordinatorComponent,
    AdminComponent
  ]
})
export class DashboardModule { }
