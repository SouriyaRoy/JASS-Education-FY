import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})

export class CookieComponent implements OnInit {
  cookieValue
  constructor(private cookieService : CookieService,
              private router : Router,) {
    this.cookieService.set('Test','This is the content of the cookie')
    this.cookieValue = this.cookieService.get('Test')
    console.warn(this.cookieValue)
    router.navigateByUrl('forum/feed')
  }

  ngOnInit(): void {
  }

}
