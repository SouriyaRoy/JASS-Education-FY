import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isAdmin = true

  constructor(private feed : FeedApiCallsService, private cookie : CookieService, private router : Router) {
    // this.feed.get_feed().subscribe(res => {
    //   this.feed_call = res['data']
    //   console.log(this.feed_call)
    // })
    this.feed.getData().subscribe(res => {
      this.feed_call = res
      //console.log(this.feed_call)
    })
   }

   AdminPanel(){
     if(this.isAdmin == true){
       this.router.navigateByUrl('admin-panel/admin-home')
     }else{
       alert("You are not Admin")
     }
   }


  ngOnInit(): void {
    this.cookieExists = this.cookie.check('Test')
  }

}
