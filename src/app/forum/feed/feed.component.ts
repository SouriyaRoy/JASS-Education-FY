import { Component, OnInit } from '@angular/core';
import { FeedApiCallsService } from 'src/app/views/feed-api-calls.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed_call

  constructor(private feed : FeedApiCallsService) {
    // this.feed.get_feed().subscribe(res => {
    //   this.feed_call = res['data']
    //   console.log(this.feed_call)
    // })
    this.feed.getData().subscribe(res => {
      this.feed_call = res
      console.log(this.feed_call)
    })
   }

  ngOnInit(): void {
  }

}
