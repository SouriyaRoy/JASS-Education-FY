import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  isAdmin = false
  isCoor = false

  constructor(private cookie : CookieService, private router : Router, private uauth : UserAuthService) {
    uauth.check_admin().then((res) => {
      if(res['success'] = true){
        this.isAdmin = true
      }
    },(error) => {console.error(error)})
    uauth.check_coordinator().then((res) => {
      if(res['success'] = true){
        this.isCoor = true
      }
    },(error) => {console.error(error)})
  }

  LoginAdmin(){
    this.cookie.set('Role','Admin')
    this.router.navigateByUrl('admin-panel/admin-home')
  }  

  LoginUser(){
    this.cookie.set('Role','User')
    this.router.navigateByUrl('forum/feed')
  }

  LoginCoor(){
    this.cookie.set('Role','Coor')
    this.router.navigateByUrl('forum/feed')
  }

  ngOnInit(): void {
  }

}
