import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
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
    private uauth : UserAuthService) {

  }

  async ngOnInit(): Promise<void> {

    this.route.params.subscribe(params => {
      this.identity = params.id
    })

    await this.feed.get_specific_post(this.identity).then((res) => {
      this.data = res
      this.forum_id = res[0].data.forum_ref
      this.isAssignment = res[0].data.assignment_ref //TODO : check if user already submitted assignment, if yes show appropriate mssg
      this.isLecture = res[0].data.lecture_ref
      this.isVideo = res[0].data.video_ref
      //console.log(this.data)
    }, (error) => {
      alert("Check Console")
      console.warn(error)
    })

    await this.feed.get_reply_id(this.forum_id).then((res) => {
      //console.warn(res)
      for(let item of res){
        this.feed.get_replies(item).then((res) => {
          this.replies.push(res)
          this.uauth.get_specific_user_data(res['data']['reply']['user_ref']).then((res2) => {
            this.user_data.push(res2)
          },(err) => {console.error(err)})
        },(error) => {
          console.error(error)
        })
      }
      console.warn(this.replies, this.user_data)
    },(error) => {console.error(error)})

  }

  [x: string]: any;
  public replies = new Array()
  public user_data = new Array()
  public replytoreply = new Array()
  public user_data_2 = new Array()
  identity: any
  data: any
  form_data
  upvote = 100
  downvote = 67
  forum_id = ""
  isAssignment = ""; isLecture = ""; isVideo = "";


  reply_form = new FormGroup({
    reply: new FormControl()
  })
  replyofreply_form = new FormGroup({
    replyofreply : new FormControl()
  })

  Upvote() {
    var p = document.getElementById('upvote')
    p.innerHTML = (this.upvote + 1).toString()
  }
  Downvote() {
    var p = document.getElementById('downvote')
    p.innerHTML = (this.downvote + 1).toString()
  }

  showReply() {
    let rep = document.getElementById('reply')
    rep.removeAttribute('hidden')
  }
  showReplyofReply(id) {
    let rep = document.getElementById('replyofreply-'+id)
    rep.removeAttribute('hidden')
  }

  async ReplySubmit(form_data) {
    //console.warn(form_data,this.data[0]['data']['forum_ref'])
    await this.feed.reply(form_data, this.data[0]['data']['forum_ref']).then((result) => {
      //console.log(result)
      this.router.navigateByUrl('forum/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['views/show-post/'+this.identity]);
    }); 
    }, (error) => {
      alert("Check Console")
      console.warn(error)
    })
  }

  async ReplyofreplySubmit(data,id) {
    //console.warn(data,id)
    await this.feed.reply_of_reply(data,id).then((res) => {
      //console.log(res)
      this.router.navigateByUrl('forum/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['views/show-post/'+this.identity]);
    }); 
    },(error) => {
      console.error(error)
    })
  }

  async showReplies(reply_id, id){
    console.warn(reply_id,id)
    this.replytoreply = []
    this.user_data_2 = []
    await this.feed.get_replytoreply_id(reply_id).then((res) => {
      //console.log(res)
      for(let item of res){
        this.feed.get_replytoreply(item).then((res1) => {
          this.replytoreply.push(res1)
          this.uauth.get_specific_user_data(res1['data']['user_ref']).then((res2) => {
            this.user_data_2.push(res2)
          },(error) => {console.error(error)})
        },(err) => {console.error(err)})
      }
      console.log(this.replytoreply, this.user_data_2)
    },(error) => {console.error(error)})
    console.log(document.getElementById('reply_'+id))
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
        this.cookie.deleteAll('Test')
        this.cookie.delete('Role')
        console.log("Successfully logged out")
      }
      this.router.navigateByUrl('forum/home')
    }, (error) => {
      console.error(error)
    })
  }
}
