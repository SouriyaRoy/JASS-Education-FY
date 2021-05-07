import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JASS';
  active = 'top';

  cookieExists
  
  constructor(private cookie : CookieService, private router : Router){
    this.cookieExists = this.cookie.check('Test')
    if (this.cookieExists) {
      console.warn("YES")
      this.router.navigate(['forum/feed'])
    }else{
      this.router.navigate(['forum/home'])
    }
  }

  ngOnInit(){
  }
}
