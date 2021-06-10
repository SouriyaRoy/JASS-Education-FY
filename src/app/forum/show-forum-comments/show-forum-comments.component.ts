import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  cookieExists; usercookie; identity; data; forum_id;
  public data1 = new Array()

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
      //this.data1 = res
      for(let i=0; i<res.length; i++){
        this.feed.get_replies(res[i]).then((res2) => {
          res[i] = res2
          //console.log(res2)
          this.uauth.get_specific_user_data(res2['data']['reply']['user_ref']).then((res3) => {
            //console.log(res3)
            res[i].data.reply.user_ref = res3['data']
            for(let j=0; j<(res[i].data.reply2).length; j++){
              //console.log(i,j)
              this.feed.get_replytoreply(res[i].data.reply2[j]).then((res4) => {
                //console.log(res4)
                res[i].data.reply2[j] = res4['data']
                //console.warn(res[i].data.reply2)
                this.uauth.get_specific_user_data(res4['data']['user_ref']).then((res5) => {
                  res[i].data.reply2[j].user_ref = res5['data']
                  //console.error(res[i].data.reply2[j].user_ref)
                })
              })
              //console.error(res[i].data.reply2)
            }
            this.data1.push(res[i])
          })
        },(error) => {console.error(error)})
        //console.log(this.data1)
      }
      console.log(this.data1)
    },(error) => {console.error(error)})
    
  }

  reprepsubmit = new FormGroup({
    reprep : new FormControl('')
  })

  show(id) {
    let rep = document.getElementById('replyofreply-'+id)
    rep.removeAttribute('hidden')
  }

  async reprepsubform(data,id) {
    await this.feed.reply_of_reply(data,id).then((res) => {
      //console.log(res)
      this.router.navigateByUrl('forum/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['forum/show-comments/'+this.identity]);
      }); 
    },(error) => { console.error(error)})
  }

  upclick = 1; downclick = 1;
  async Vote(data, up, down, reply_id){
    console.warn(up, down)
    if(data == 1 && (this.upclick == 1 || this.upclick == 0)){
      this.upclick++;
      console.log(document.getElementById("upvote").innerHTML = ((up+1)-down).toString())
      await this.feed.reply_vote(1, reply_id).then((res) => {
        console.warn(res)
      })
      //console.log(this.upvote)
    }else if(data ==0 && (this.downclick == 1 || this.downclick == 0)){
      this.downclick++;
      console.log(document.getElementById("upvote").innerHTML = (up-(down+1)).toString())
      // this.downvote++;
      await this.feed.reply_vote(0, reply_id).then((res) => {
        console.warn(res)
      })
      //console.log(this.upvote)
    }
  }

  logout(){
    this.uauth.user_logout().then((result) => {
      if(result['success'] == true){
        this.cookie.delete('Test')
        this.cookie.delete('Role')
        console.log("Successfully logged out")
      }
      this.router.navigateByUrl('forum/home')
    }, (error) => {
      console.error(error)
    })
  }

}
