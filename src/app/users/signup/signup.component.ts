import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private user : UserserviceService,
              private cookieService : CookieService) { }

  createCookie

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

    this.user.send_registration_data(data).subscribe(receive => {
      if(receive['success']==true){
        document.getElementById('signup').innerHTML = "User Registration Successfull"
      }else{
        document.getElementById('signup').innerHTML = "Fail"
      }

      console.warn(receive['data'])
      this.createCookie = receive['data']
      this.cookieService.set('Test',this.createCookie)
    })
    console.warn(data)
    //this.user.send_registration_data(data)
  }

  ngOnInit(): void {
  }

}
