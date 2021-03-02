import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router, RouterModule, Routes} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JASS';
  active = 'top';
  cookieExists
  constructor(private cookie : CookieService, private router : Router){ 
    this.cookieExists = this.cookie.check('Test')
    if (this.cookieExists) {
      console.warn("YES")
    }else{
      router.navigate(['users/login'])
    }
  }


}
