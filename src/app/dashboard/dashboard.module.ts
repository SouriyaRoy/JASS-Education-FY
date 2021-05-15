import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StudentComponent } from './student/student.component';
import { TeacherCoordinatorComponent } from './teacher-coordinator/teacher-coordinator.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [StudentComponent, 
    TeacherCoordinatorComponent, 
    AdminComponent
  ],

  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  
  exports: [
    StudentComponent,
    TeacherCoordinatorComponent,
    AdminComponent
  ]
})
export class DashboardModule { }
