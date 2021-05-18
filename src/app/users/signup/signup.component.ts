import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from '../../services/userservice.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private user : UserserviceService,
              private cookieService : CookieService,
              private router : Router) { }

  createCookie
  cookieExists

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

    if(data.security_ques=="")
      data.security_ques=null;

    if(data.security_ans=="")
      data.security_ans=null;

    this.user.send_registration_data(data).subscribe((receive) => {
      console.log(receive)
      if(receive['success']==true){
        this.cookieService.set('Test',receive['data']['JWT'])
        this.router.navigateByUrl('forum/feed')
      }else{
        document.getElementById('signup').innerHTML = "Registration Failed"
      }
    }, (error) => {
      console.error(error)
    })
  }

  ngOnInit(): void {
    this.cookieExists = this.cookieService.check("Test")
  }

}
