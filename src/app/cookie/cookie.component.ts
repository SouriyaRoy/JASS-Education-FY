import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {
  cookieValue
  constructor(private cookieService : CookieService,
              private router : Router,
              private con : AppComponent) {
    this.cookieService.set('Test','This is the content of the cookie')
    this.cookieValue = this.cookieService.get('Test')
    console.warn(this.cookieValue)
    this.ngOnInit()
    //this.cookieService.delete('Test')
    // this.router.navigate[('./forum/feed')]
    
   }

  ngOnInit(): void {
    // if(this.cookieService.check('Test'))
    this.con.ngOnInit()
  }

}
