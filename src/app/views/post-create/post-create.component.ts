import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../../services/userservice.service';
import { FeedApiCallsService } from '../../services/feed-api-calls.service';
import { CookieService } from 'ngx-cookie-service';
import { YoutubeUploadComponent } from '../youtube-upload/youtube-upload.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  profile_details
  cookieExists
  disabledBox1 = true
  disabledBox2 = true
  disabledBox3 = true
  disabledBox4 = true
  subject_array = ["One","Two","Three"]

  PostSubmit(data){
    var ass_id="",lec_id="",video_id="",subject_id="",forum_id="",title="",description=""

    if(data.enableassignment == true){
      ass_id = this.AssignSubmit(data.assignment_title,data.assignment_description,data.assignment_link_1,data.assignment_link_2)
    }

    if(data.enablelecture ==true){
      lec_id = this.LectureSubmit(data.lecture_title,data.lecture_description,data.lecture_link_1,data.lecture_link_2)
    }
    title = data.title
    description = data.description
    subject_id = data.subject
    //console.warn(ass_id, lec_id, video_id, subject_id, forum_id, title, description)
    this.api_call.post_submit(ass_id, lec_id, video_id, subject_id, forum_id,title,description).subscribe((response) => {
      console.warn(response)
      this.router.navigateByUrl('forum/feed')
    },(error) => {
      console.error(error)
    })
  }

  AssignSubmit(title, description, link1, link2){
    var ass_id
    this.api_call.submit_assignment_teacher(title, description, link1, link2).subscribe((result) => { 
      console.warn(result)
      if(result['success'] == true){
        //this.router.navigate(['./forum/feed'])
        ass_id = result['data']['assignment_id']
        //console.warn(ass_id)
      }
    }, (error) => {
      console.warn(error)
    })
    //console.warn(ass_id)
    return ass_id
  }

  LectureSubmit(title, description, link1, link2){
    var lec_id
    this.api_call.submit_lecture_teacher(title, description, link1, link2).subscribe((result) => { 
      console.warn(result)
      if(result['success'] == true){
        //this.router.navigate(['./forum/feed'])
        lec_id = result['data']['lecture_id']
        //console.warn(lec_id)
      }
    }, (error) => {
      console.warn(error)
    })
    //console.warn(lec_id)
    return lec_id
  }

  post_form = new FormGroup({
    title : new FormControl(),
    description : new FormControl(),
    subject : new FormControl(),
    enableassignment : new FormControl(false),
    enablelecture : new FormControl(false),
    assignment_title : new FormControl(),
    assignment_description : new FormControl(),
    assignment_link_1 : new FormControl(),
    assignment_link_2 : new FormControl(),
    lecture_title : new FormControl(),
    lecture_description : new FormControl(),
    lecture_link_1 : new FormControl(),
    lecture_link_2 : new FormControl()
  })

  enableBox1() {
    let p = document.getElementById('assignment_hide');
    p.removeAttribute('hidden');
  }
  enableBox2() {
    let p = document.getElementById('lecture_hide');
    p.removeAttribute('hidden');
  }
  enableBox3() {
    let p = document.getElementById('video_hide');
    p.removeAttribute('hidden');
  }
  enableBox4() {
    let p = document.getElementById('forum_hide');
    p.removeAttribute('hidden');
  }

  constructor(private api_call : FeedApiCallsService,
              private router : Router,
              private cookie : CookieService,
              private dialog : MatDialog) {
    // user.get_user_profile_details()
    // .subscribe(result => {
    //   this.profile_details = result
    // })
  }

  file: File;
  videoSelected = false;
  loading = false;
  isUploaded = false;
  @ViewChild('videoFile') nativeInputFile: ElementRef;
  @ViewChild('video') video: any;
  url: string;


  selectVideo(data) {
    this.videoSelected = true;
    if (navigator.userAgent.search('firefox')) {
      this.file = data.target.files[0];
    } else {
      this.file = data.srcElement.files[0];
    }
    this.video.nativeElement.src = window.URL.createObjectURL(this.file);
  }

  pickFile() {
    this.nativeInputFile.nativeElement.click();
  }


  youtubeSubmit() {
    const dialog = this.dialog.open(YoutubeUploadComponent, {
      data: {video: this.file}
    });
    dialog.updateSize('70%', '70%');
  }

  ngOnInit(): void {
    this.cookieExists = this.cookie.check('Test')
  }

}
