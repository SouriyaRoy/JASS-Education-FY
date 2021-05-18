import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { FeedApiCallsService } from '../../services/feed-api-calls.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed_call
  cookieExists
  
  assignment; lecture; video;

  constructor(private feed : FeedApiCallsService,
              private cookie : CookieService,
              private router : Router,
              private uauth : UserAuthService) { //TODO: hit admin and coordinator for access check (GET) and redirect to any one
    this.feed.get_feed().then((res) => {
      this.feed_call = res['data']
    }, (error) => {
      alert("Check Console")
      console.error(error)
    })
    // feed.getData().then((res) => {
    //   this.feed_call = res
    // }, (error) => {
    //   console.error(error)
    // })
   }

  AdminPanel(){
    this.uauth.check_admin().then((response) => {
      if(response['success'] == true){
        this.router.navigateByUrl('admin-panel/admin-home')
      }
    }, (error) => {
      alert("You are not Authorized")
      this.router.navigateByUrl('dashboard/admin')
    })
  }

  logout(){
    this.uauth.user_logout().then((result) => {
      if(result['success'] == true){
        console.log("Successfully logged out")
        this.cookie.delete('Test')
      }
      this.router.navigateByUrl('forum/home')
    }, (error) => {
      console.error(error)
    })
  }

  ngOnInit(): void {
    this.cookieExists = this.cookie.check('Test')
  }
}