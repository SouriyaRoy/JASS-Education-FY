import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cookieExists

  async loginSubmit(formdata){ 
    console.warn(formdata)
    await this.signin.user_login(formdata).then((receive) => {
      console.warn(receive)
      if(receive[0]['success'] == true && (receive[1]==true && receive[2]==true)){
        //this.cook.set('Test',receive['data']['JWT'])
        this.router.navigateByUrl('../users/choose')
        //this.uauth.check_admin().then()
      }else{
        this.router.navigateByUrl('forum/feed')
      }
    }, (error) => {
      console.error(error)
      document.getElementById('error_message').innerHTML = "Please check and try again"
    })
  }

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  constructor(private signin : UserAuthService,
              private cook : CookieService,
              private router : Router,
              private uauth : UserAuthService) {

  }

  ngOnInit(): void {
    this.cookieExists = this.cook.check('Test')
  }

}
