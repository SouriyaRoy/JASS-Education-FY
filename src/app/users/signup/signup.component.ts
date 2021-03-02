import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private user : UserserviceService) { }

  signupForm = new FormGroup({
    first_name : new FormControl('',[Validators.required]),
    middle_name : new FormControl(''),
    last_name : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(8)]),
    security_ques : new FormControl(''),
    security_ans : new FormControl('')
  })

  formSubmit(data){
    if(data.middle_name=="")
      data.middle_name=null;
    //this.user.send_registration_data(data)
    console.warn(data)
  }

  ngOnInit(): void {
  }

}