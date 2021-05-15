import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ViewsRoutingModule } from './views-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { YoutubeUploadComponent } from './youtube-upload/youtube-upload.component';
import { MatDialogModule } from '@angular/material/dialog'
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { YoutubeService } from '../services/youtube.service';
import { AlertService } from '../services/alert.service';

@NgModule({
  declarations: [ProfileComponent,
    PostCreateComponent,
    EditProfileComponent,
    ShowPostComponent,
    YoutubeUploadComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule, FlexLayoutModule, FlexModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatProgressBarModule,
    MatIconModule, MatRadioModule, MatTooltipModule, MatButtonModule, MatProgressSpinnerModule
  ],
  exports: [
    ProfileComponent,
    PostCreateComponent,
    EditProfileComponent,
    ShowPostComponent,
    YoutubeUploadComponent,
  ],
  providers: [
    YoutubeService, AlertService
  ]
})
export class ViewsModule { }
