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
  isAdmin

  constructor(private feed : FeedApiCallsService,
              private cookie : CookieService,
              private router : Router,
              private uauth : UserAuthService) {
    this.feed.getData().subscribe((res) => {
      this.feed_call = res
    }, (error) => {
      alert("Check Console")
      console.error(error)
    })
   }

  //  async AdminPanel(){
  //    var res = await this.uauth.check_admin()
  //    this.isAdmin = res['success']
  //    if(this.isAdmin == true){
  //       this.router.navigateByUrl('admin-panel/admin-home')
  //     }else{
  //       alert("You are not authorized")
  //       this.router.navigateByUrl('dashboard/admin')
  //    //console.warn(res['success'])
  //   }
  // }

  AdminPanel(){
    this.uauth.check_admin().subscribe((response) => {
      if(response['success'] == true){
        this.router.navigateByUrl('admin-panel/admin-home')
      }
    }, (error) => {
      alert("You are not Authorized")
      this.router.navigateByUrl('dashboard/admin')
    })
  }

  ngOnInit(): void {
    this.cookieExists = this.cookie.check('Test')
  }
}