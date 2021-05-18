import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../../services/userservice.service';
import { FeedApiCallsService } from '../../services/feed-api-calls.service';
import { CookieService } from 'ngx-cookie-service';
import { YoutubeUploadComponent } from '../youtube-upload/youtube-upload.component'
import { MatDialog } from '@angular/material/dialog'
import { UserAuthService } from 'src/app/services/user-auth.service';

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
  subject_array = []
  ass_id=""
  lec_id=""
  video_id=""
  subject_id=""
  forum_id=""
  title=""
  description=""

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  async PostSubmit(data){

    var assign_iden
    var lecture_iden
    var random_forum_id

    if(data.enableforum == true){
      await this.api_call.get_forum_id(Math.random().toString(36).substring(2,7)).then((result) => {
        random_forum_id = result['data']['forum_id'];
        console.warn(random_forum_id)
      }, (error) => {
        console.warn(error)
      });      
    }

    if(data.enableassignment == true){
      await this.api_call.submit_assignment_teacher(data.assignment_title,data.assignment_description,data.assignment_link_1,data.assignment_link_2).then((result) => {
        assign_iden = result['data']['assignment_id'];
        console.error(assign_iden)
      }, (error) => {
        alert("Check Console")
        console.warn(error)
      })
    }

    if(data.enablelecture ==true){
      await this.api_call.submit_lecture_teacher(data.lecture_title,data.lecture_description,data.lecture_link_1,data.lecture_link_2).then((result) => {
        lecture_iden = result['data']['lecture_id'];
        console.warn(lecture_iden)
      }, (error) => {
        alert("Check console")
        console.warn(error)
      })
    }

    this.title = data.title
    this.description = data.description
    this.subject_id = data.subject

    console.warn(assign_iden, lecture_iden, this.video_id, this.subject_id, random_forum_id, this.title, this.description)

    this.api_call.post_submit(assign_iden, lecture_iden, this.video_id, this.subject_id, random_forum_id, this.title, this.description).then((response) => {
      console.warn(response)
      this.router.navigateByUrl('forum/feed')
    },(error) => {
      console.error(error)
    })
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
    lecture_link_2 : new FormControl(),
    enableforum : new FormControl()
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

  AdminPanel(){
    this.uauth.check_admin().then((response) => {
      if(response['success'] == true){
        this.router.navigateByUrl('admin-panel/admin-home')
      }
    }, (error) => {
      alert("You are not Authorized")
      this.router.navigateByUrl('dashboard/admin')
    })
  }


  constructor(private api_call : FeedApiCallsService,
              private router : Router,
              private cookie : CookieService,
              private dialog : MatDialog,
              private uauth : UserAuthService) {
    // user.get_user_profile_details()
    // .subscribe(result => {
    //   this.profile_details = result
    // })
    api_call.get_subjects().subscribe((res) => {
      this.subject_array = res['data']
    }, (error) => {
      alert("Check console")
      console.warn(error)
    })
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
