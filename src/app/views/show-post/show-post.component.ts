import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { FeedApiCallsService } from '../../services/feed-api-calls.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
  [x: string]: any;

  identity : any
  data : any   
  upvote = 100
  downvote = 67

  reply_form = new FormGroup({
    reply : new FormControl()
  })

  Upvote(){
    var p = document.getElementById('upvote')
    p.innerHTML = (this.upvote+1).toString()
  }
  Downvote(){
    var p = document.getElementById('downvote')
    p.innerHTML = (this.downvote+1).toString()
  }

  showReply(){
    let rep = document.getElementById('reply')
    rep.removeAttribute('hidden')
  }
  showReplyofReply(){
    let rep = document.getElementById('replyofreply')
    rep.removeAttribute('hidden')
  }

  ReplySubmit(data){
    console.warn(data)
    this.feed.reply(data).subscribe((result) => {
      console.log(result)
    }, (error) => {
      alert("Check Console")
      console.warn(error)
    })
  }
  ReplyofreplySubmit(data){
    console.warn(data)
  }

  constructor(private route : ActivatedRoute,
              private router : Router,
              private feed : FeedApiCallsService) {
                
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.identity = params.id
    })
    this.feed.get_specific_post(this.identity).subscribe((res) => {
      this.data = res
    }, (error) => {
      alert("Check Console")
      console.warn(error)
    })
  }

}
