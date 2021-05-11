import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../../services/userservice.service';
import { FeedApiCallsService } from '../../services/feed-api-calls.service';
import { CookieService } from 'ngx-cookie-service';

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

  PostSubmit(data){
    //console.warn(data)
    if(data.enableassignment == true){
      this.AssignSubmit(data.assignment_title,data.assignment_description,data.assignment_link_1,data.assignment_link_2)
    }
    if(data.enablelecture ==true){
      this.LectureSubmit(data.lecture_title,data.lecture_description,data.lecture_link_1,data.lecture_link_2)
    }
  }
  AssignSubmit(title, description, link1, link2){
    //console.warn(title, description, link1, link2)
    this.api_call.submit_assignment_teacher(title, description, link1, link2).subscribe(result => {
      console.warn(result)
      if(result['success'] == true){
        //this.router.navigate(['./forum/feed'])
      }
    })
  }
  LectureSubmit(title, description, link1, link2){
    //console.warn(title, description, link1, link2)
    this.api_call.submit_lecture_teacher(title, description, link1, link2).subscribe(result => {
      console.warn(result)
      if(result['success'] == true){
        //this.router.navigate(['./forum/feed'])
      }
    })
  }

  post_form = new FormGroup({
    title : new FormControl(),
    description : new FormControl(),
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
              private cookie : CookieService) {
    // user.get_user_profile_details()
    // .subscribe(result => {
    //   this.profile_details = result
    // })
  }

  ngOnInit(): void {
    this.cookieExists = this.cookie.check('Test')
  }

}
