import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CoursesRoutingModule } from './courses-routing.module';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SubmissionComponent } from './submission/submission.component';
import { ViewSubmissionsComponent } from './view-submissions/view-submissions.component';
import { ViewSpecAssignmentComponent } from './view-spec-assignment/view-spec-assignment.component';


@NgModule({
  declarations: [
    EnrollmentComponent,
    SubmissionComponent,
    ViewSubmissionsComponent,
    ViewSpecAssignmentComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EnrollmentComponent,
    SubmissionComponent,
    ViewSubmissionsComponent,
    ViewSpecAssignmentComponent
  ]
})
export class CoursesModule { }
