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

  post_form = new FormGroup({
    title : new FormControl(),
    description : new FormControl()
  })

  enableBox1() {
    //this.disabledBox1 = false
    // let p = document.getElementById('assignment_hide');
    // p.removeAttribute('hidden');
  }
  enableBox2() {
    this.disabledBox1 = false
  }
  enableBox3() {
    this.disabledBox1 = false
  }
  enableBox4() {
    this.disabledBox1 = false
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
