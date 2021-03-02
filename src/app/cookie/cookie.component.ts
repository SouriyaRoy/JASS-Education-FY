import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {
  cookieValue
  constructor(private cookieService : CookieService) {
    this.cookieService.set('Test','This is the content of the cookie')
    this.cookieValue = this.cookieService.get('Test')
    console.warn(this.cookieValue)
    //this.cookieService.delete('Test')
   }

  ngOnInit(): void {
  }

}
