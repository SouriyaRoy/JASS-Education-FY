import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component'
import { CoursesComponent } from './courses/courses.component'
import { EnrollmentComponent } from './enrollment/enrollment.component'
import { SubmissionsComponent } from './submissions/submissions.component'

const routes: Routes = [
  {
    path : 'assignments',
    component : AssignmentsComponent
  },
  {
    path : 'courses',
    component : CoursesComponent
  },
  {
    path : 'enrollment',
    component : EnrollmentComponent
  },
  {
    path : 'submissions',
    component : SubmissionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
