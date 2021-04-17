import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginSubmit(formdata){
    console.warn(formdata)
    this.signin.user_login(formdata).subscribe(receive => {
      if(receive['success'] == true)
      {
        console.warn(receive)
        this.cook.set('Test',receive['data'])
        // this.signin.check_admin().subscribe(receive => {
        this.router.navigate(['./forum/feed'])
        // })
      }
    })
  }

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  constructor(private signin : UserAuthService, private cook : CookieService, private router : Router) { }

  ngOnInit(): void {
  }

}
