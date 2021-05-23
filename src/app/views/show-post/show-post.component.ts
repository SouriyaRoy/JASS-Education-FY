import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
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
    private feed: FeedApiCallsService) {

  }

  async ngOnInit(): Promise<void> {

    this.route.params.subscribe(params => {
      this.identity = params.id
    })

    this.feed.get_specific_post(this.identity).then((res) => {
      this.data = res
    }, (error) => {
      alert("Check Console")
      console.warn(error)
    })

    // await this.feed.getspecificPost(this.identity).then((res) => {
    //   // this.forum_id = res[1][0]['id']
    //   this.data = res
    //   console.warn(this.data)
    // }, (error => {
    //   alert("Check Console")
    //   console.error(error)
    // }))
  }

  [x: string]: any;

  identity: any
  data: any
  form_data
  upvote = 100
  downvote = 67
  forum_id = "2"
  isAssignment = "2"; isLecture = "6"; isVideo = "2"


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

  ReplySubmit(form_data) {
    console.warn(form_data, this.data['data']['forum_id'])
    this.feed.reply(form_data, this.data['data']['forum_id']).subscribe((result) => {
      console.log(result)
    }, (error) => {
      alert("Check Console")
      console.warn(error)
    })
  }

  ReplyofreplySubmit(data) {
    console.warn(data)
  }

  showAssignment(){
    Swal.fire({
      title: 'Assignment',
      html:
        'Assignment Name<br><br>' +
        'Description<br><br> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true
    })
  }

  showLecture(){
    Swal.fire({
      title: 'Lecture',
      html:
        'Assignment Name<br><br>' +
        'Description<br><br> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true
    })
  }

  showVideo(){
    Swal.fire({
      title: 'Video',
      html:
        'Assignment Name<br><br>' +
        'Description<br><br> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true
    })
  }
  
}
