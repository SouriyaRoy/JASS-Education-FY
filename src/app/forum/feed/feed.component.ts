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

  constructor(private feed : FeedApiCallsService, private cookie : CookieService, private router : Router, private uauth : UserAuthService) {
    // this.feed.get_feed().subscribe(res => {
    //   this.feed_call = res['data']
    //   console.log(this.feed_call)
    // })
    this.feed.getData().subscribe(res => {
      this.feed_call = res
      //console.log(this.feed_call)
    })
   }

   async AdminPanel(){
     var res = await this.uauth.check_admin()
     this.isAdmin = res['success']
     if(this.isAdmin == true){
        this.router.navigateByUrl('admin-panel/admin-home')
      }else{
        alert("You are not authorized")
        this.router.navigateByUrl('dashboard/admin')
     //console.warn(res['success'])
    }
  }
    //  while(typeof(this.isAdmin) == undefined){
    //    continue
    //  }
    //  console.warn("2", this.isAdmin, typeof(this.isAdmin))

    //  if(this.isAdmin == true){
    //    console.warn("3", this.isAdmin, typeof(this.isAdmin))
    //   this.router.navigateByUrl('admin-panel/admin-home')
    // }else{
    //   alert("You are not Admin")
    //   this.router.navigateByUrl('dashboard/admin')
    // }
    // if(this.isAdmin == true){
    //   this.router.navigateByUrl('admin-panel/admin-home')
    // }else{
    //   alert("You are not Admin")
    //   this.router.navigateByUrl('dashboard/admin')
    // }


  ngOnInit(): void {
    this.cookieExists = this.cookie.check('Test')
  }
}