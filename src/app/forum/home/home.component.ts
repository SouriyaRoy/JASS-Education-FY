import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cookieExists

  constructor(private cookie : CookieService) { }

  ngOnInit(): void {
    this.cookieExists = this.cookie.check('Test')
  }

}
