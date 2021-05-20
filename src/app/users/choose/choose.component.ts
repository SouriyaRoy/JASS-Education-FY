import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  constructor(private cookie : CookieService, private router : Router) { }

  LoginAdmin(){
    this.cookie.set('Role','Admin')
    this.router.navigateByUrl('forum/feed')
  }  

  LoginUser(){
    this.cookie.set('Role','User')
    this.router.navigateByUrl('forum/feed')
  }

  ngOnInit(): void {
  }

}
