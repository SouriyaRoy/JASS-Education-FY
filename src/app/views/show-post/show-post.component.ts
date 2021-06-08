import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import Swal from 'sweetalert2';
import { FeedApiCallsService } from '../../services/feed-api-calls.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private feed: FeedApiCallsService,
    private uauth : UserAuthService,
    private cookie : CookieService) {

  }

  async ngOnInit(): Promise<void> {
    //this.cookieExists = this.cookie.check('Test')

    this.route.params.subscribe(params => {
      this.identity = params.id
    })

    // this.feed.get_all_submissions().then((res) => {
    //   if(res['data'].length == 0){
    //     this.isAssignment = "1"
    //   }else{
    //     this.isAssignment = "0"
    //   }
    // })

    await this.feed.get_specific_post(this.identity).then((res) => {
      this.data = res
      this.upvote = this.data[0].data.up
      this.downvote = this.data[0].data.down
      console.log(this.data)
      this.feed.check_submissions_for_user(res[0].data.assignment_ref).then((res2) => {
        console.log(res2)
        if(res2['data']['submission'].length == 0){
          console.log(res2['data']['submission'].length)
          this.isAssignment = 1
        }else{
          console.log(res2['data']['submission'].length)
          this.isAssignment = 0
        }
        console.warn(this.isAssignment)
      })
      this.forum_id = res[0].data.forum_ref
      this.isLecture = res[0].data.lecture_ref
      this.isVideo = res[0].data.video_ref
      //console.log(this.data)
    }, (error) => {
      alert("Check Console")
      console.warn(error)
    })

    // await this.feed.get_reply_id(this.forum_id).then((res) => {
    //   // console.warn(res)
    //   for(let item of res){
    //     this.feed.get_replies(item).then((res) => {
    //       //this.replies.push(res)
    //       this.uauth.get_specific_user_data(res['data']['reply']['user_ref']).then((res2) => {            
    //         res['data']['reply']['user_ref'] = res2['data']
    //         // console.warn(res['data']['reply']['user_ref'])
    //         this.replies.push(res)
    //       },(err) => {console.error(err)})
    //     },(error) => {
    //       console.error(error)
    //     })
    //   }
    //   console.warn(this.replies)
    // },(error) => {console.error(error)})

  }

  [x: string]: any;
  public replies = new Array()
  public user_data = new Array()
  public replytoreply = new Array()
  public user_data_2 = new Array()
  identity: any
  data: any
  form_data
  upvote
  downvote
  forum_id = ""
  isAssignment; isLecture; isVideo;


  reply_form = new FormGroup({
    reply: new FormControl()
  })

  async ReplySubmit(data){
    //console.log(this.forum_id, data)
    this.feed.reply(data, this.forum_id).then((res) => {
      //console.warn(res)
      this.router.navigateByUrl('forum/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['forum/show-comments/'+this.identity]);
      }); 
    })
  }

  upclick = 1; downclick = 1;

  async Vote(data){
    if(data == 1 && (this.upclick == 1 || this.upclick == 0)){
      this.upclick++;
      this.downclick--;
      this.upvote++;
      await this.feed.post_vote(1, this.identity).then((res) => {
        console.warn(res)
      })
      //console.log(this.upvote)
    }else if(data ==0 && (this.downclick == 1 || this.downclick == 0)){
      this.downclick++;
      this.upclick--;
      this.downvote++;
      await this.feed.post_vote(0, this.identity).then((res) => {
        console.warn(res)
      })
      //console.log(this.upvote)
    }
  }

  showReply() {
    let rep = document.getElementById('reply')
    rep.removeAttribute('hidden')
  }

  showAssignment(res){
    console.warn(res)
    Swal.fire({
      title: 'Assignment Details',
      html:
        '<br>' + res[1].data.assignment.body + '<br><br>' +
        'Link1 : ' + res[1].data.assignment.external_url_1 + '<br><br>' +
        'Link2 : ' + res[1].data.assignment.external_url_2 + '<br><br>' +
        'Total Marks : ' + res[1].data.assignment.total_score ,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl("/courses/submission/"+res[0]['data']['assignment_ref'])
      } 
    })
  }

  showLecture(res){
    Swal.fire({
      title: 'Lecture Details',
      html:
      '<br>' + res[2].data.body + '<br><br>' +
      'Link1 : ' + res[2].data.external_url_1 + '<br><br>' +
      'Link2 : ' + res[2].data.external_url_2 + '<br><br>' ,
      showCloseButton: true,
      showCancelButton: true
    })
  }

  showVideo(){
    Swal.fire({
      title: 'Video',
      html:
        'Video ID<br><br>' +
        'Description<br><br> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true
    })
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
