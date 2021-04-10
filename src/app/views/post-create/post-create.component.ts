import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  disabledBox1 = true
  disabledBox2 = true
  disabledBox3 = true
  disabledBox4 = true

  PostSubmit() {

  }
  AssignSubmit(){

  }
  LectureSubmit(){

  }

  post_form = new FormGroup({
    title : new FormControl(),
    description : new FormControl()
  })
  assignment_form = new FormGroup({
    assignment_title : new FormControl(),
    assignment_description : new FormControl(),
    assignment_link_1 : new FormControl(),
    assignment_link_2 : new FormControl()
  })
  lecture_form = new FormGroup({
    lecture_title : new FormControl(),
    lecture_description : new FormControl(),
    lecture_link_1 : new FormControl(),
    lecture_link_2 : new FormControl()
  })

  enableBox1() {
    //this.disabledBox1 = false
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

  constructor() { }

  ngOnInit(): void {
  }

}
