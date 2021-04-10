import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginSubmit(formdata){
    //console.warn(data)
    this.signin.user_login(formdata).subscribe(receive => {
      if(receive['success'] == true)
      {
        this.signin.check_admin().subscribe(receive => {
          
        })
      }
    })
  }

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(8)])
  })

  constructor(private signin : UserAuthService) { }

  ngOnInit(): void {
  }

}
