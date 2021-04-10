import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { CoursesComponent } from './courses/courses.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { SubmissionsComponent } from './submissions/submissions.component';


@NgModule({
  declarations: [EnrollmentComponent, CoursesComponent, AssignmentsComponent, SubmissionsComponent],
  imports: [
    CommonModule,
    SubjectsRoutingModule
  ],
  exports: [
    AssignmentsComponent,
    CoursesComponent,
    EnrollmentComponent,
    SubmissionsComponent,
  ]
})
export class SubjectsModule { }
