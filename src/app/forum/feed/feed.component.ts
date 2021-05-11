import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FeedApiCallsService } from '../../services/feed-api-calls.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed_call
  cookieExists

  constructor(private feed : FeedApiCallsService, private cookie : CookieService) {
    // this.feed.get_feed().subscribe(res => {
    //   this.feed_call = res['data']
    //   console.log(this.feed_call)
    // })
    this.feed.getData().subscribe(res => {
      this.feed_call = res
      //console.log(this.feed_call)
    })
   }

  ngOnInit(): void {
    this.cookieExists = this.cookie.check('Test')
  }

}
