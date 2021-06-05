import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SubmissionComponent } from './submission/submission.component';
import { ViewSpecAssignmentComponent } from './view-spec-assignment/view-spec-assignment.component';
import { ViewSubmissionsComponent } from './view-submissions/view-submissions.component';

const routes: Routes = [
  {
    path:'enroll',
    component: EnrollmentComponent
  },
  {
    path:'submission/:id',
    component:SubmissionComponent
  },
  {
    path: 'view-submissions',
    component: ViewSubmissionsComponent
  },
  {
    path:'view/:id',
    component: ViewSpecAssignmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
