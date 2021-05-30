import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FeedApiCallsService } from 'src/app/services/feed-api-calls.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-show-forum-comments',
  templateUrl: './show-forum-comments.component.html',
  styleUrls: ['./show-forum-comments.component.css']
})
export class ShowForumCommentsComponent implements OnInit {

  cookieExists; usercookie; identity; data; forum_id; data1

  constructor(private cookie : CookieService,
              private router : Router,
              private route : ActivatedRoute,
              private feed : FeedApiCallsService,
              private uauth : UserAuthService) { }

  async ngOnInit(): Promise<void> {

    this.cookieExists = this.cookie.check('Test')
    this.usercookie = this.cookie.get('Role')

    this.route.params.subscribe(params => {
      this.identity = params.id
      //console.log(this.identity)
    })

    await this.feed.get_specific_post(this.identity).then((res) => {
      this.data = res
      this.forum_id = res[0].data.forum_ref
      //console.warn(res, this.forum_id)
    }, (error) => {
      alert("Check Console")
      console.warn(error)
    })

    await this.feed.get_reply_id(this.forum_id).then((res) => {
      console.warn(res)
      this.data1 = res
      for(let i=0; i<this.data1.length; i++){
        this.feed.get_replies(this.data1[i]).then((res2) => {
          this.data1[i] = res2
          this.uauth.get_specific_user_data(res2['data']['reply']['user_ref']).then((res3) => {
            this.data1[i].data.reply.user_ref = res3['data']
            for(let j=0; j<(this.data1[i].data.reply2).length; j++){
              console.log(i,j)
              this.feed.get_replytoreply(this.data1[i].data.reply2[j]).then((res4) => {
                console.log(res4)
                this.data1[i].data.reply2[j] = res4['data']
              })
            }
          })
        },(error) => {console.error(error)})
        console.log(this.data1)
      }
      //console.log(this.data1)
    },(error) => {console.error(error)})
    
  }
}