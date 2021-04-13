import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ViewsRoutingModule } from './views-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AdminOrTeacherComponent } from './admin-or-teacher/admin-or-teacher.component';
import { PostCreateComponent } from './post-create/post-create.component';


@NgModule({
  declarations: [ProfileComponent, AdminOrTeacherComponent, PostCreateComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileComponent,
    AdminOrTeacherComponent,
    PostCreateComponent,
  ]
})
export class ViewsModule { }