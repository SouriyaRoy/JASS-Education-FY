import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CoursesRoutingModule } from './courses-routing.module';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SubmissionComponent } from './submission/submission.component';


@NgModule({
  declarations: [
    EnrollmentComponent,
    SubmissionComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EnrollmentComponent,
    SubmissionComponent
  ]
})
export class CoursesModule { }
