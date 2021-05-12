import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ViewsRoutingModule } from './views-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ShowPostComponent } from './show-post/show-post.component';


@NgModule({
  declarations: [ProfileComponent,
    PostCreateComponent,
    EditProfileComponent,
    ShowPostComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileComponent,
    PostCreateComponent,
    EditProfileComponent,
    ShowPostComponent,
  ]
})
export class ViewsModule { }
