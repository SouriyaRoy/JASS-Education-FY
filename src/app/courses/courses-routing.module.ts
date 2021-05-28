import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SubmissionComponent } from './submission/submission.component';

const routes: Routes = [
  {
    path:'enroll',
    component: EnrollmentComponent
  },
  {
    path:'submission/:id',
    component:SubmissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
