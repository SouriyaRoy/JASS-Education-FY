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

  //cookieExists
  
  constructor(private cookie : CookieService, 
    private router : Router){
    if (this.cookie.check('Test') && (this.cookie.get('Role') == 'Admin')) {
      this.router.navigateByUrl('admin-panel/admin-home')
    }else if(this.cookie.check('Test') && ((this.cookie.get('Role') == 'Coor') || (this.cookie.get('Role') == 'User'))){
      this.router.navigate(['forum/feed'])
    }else{
      this.router.navigate(['forum/home'])
    }
  }

  // Logout(){
  //   this.cookie.delete('Test')
  //   this.router.navigateByUrl('forum/home')
  // }

  ngOnInit(){
  }
}
