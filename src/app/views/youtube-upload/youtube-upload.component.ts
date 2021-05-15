import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {YoutubeService} from '../../services/youtube.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-youtube-upload',
  templateUrl: './youtube-upload.component.html',
  styleUrls: ['./youtube-upload.component.css']
})
export class YoutubeUploadComponent implements OnInit {

  percentageUpload = 0;
  subscription: Subscription;
  videoUrl: string;
  loading = false;

  videoForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(),
    privacyStatus: new FormControl(null, [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: { video: any }, public youtubeService: YoutubeService,
  public dialogRef: MatDialogRef<YoutubeUploadComponent>, private alertService: AlertService, private snackBar: MatSnackBar) {
  }

  onSubmit() {
    this.loading = true;
    this.dialogRef.disableClose = true;
    this.subscription = this.youtubeService
      .uploadVideo(this.data.video, this.videoForm.value).subscribe((data) => {
        if (data.type === HttpEventType.UploadProgress) {
          this.percentageUpload = Math.round(100 * data.loaded / data.total);
        } else if (data instanceof HttpResponse) {
          const response: any = data.body;
          //this.videoUrl = 'https://www.youtube.com/watch?v=neIiwpaaddA' + response.id;
          this.loading = false;
          this.alertService.success('video is uploaded to youtube successfully');
          this.dialogRef.close();
          console.warn(data)
          console.warn(data['body']['id'])
          // upload to my server
        }
      }, (error => {
        this.loading = false;
        this.dialogRef.disableClose = false;
        if (error instanceof Error) {
          this.alertService.error(error.message);
        } else {
          const errorObject = JSON.parse(error.error);
          if (errorObject.error.errors[0].reason === 'youtubeSignupRequired') {
            this.snackBar.open('You need to create a youtube channel', 'Create Channel', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['alert-error']
            }).onAction().subscribe(() => {
              window.open('https://www.youtube.com/create_channel',
                '_blank');
            });
          } else {
            this.alertService.error(errorObject.error.message);
          }
        }
      }));
  }

  onCancel(){
    this.subscription.unsubscribe();
    this.loading = false;
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}