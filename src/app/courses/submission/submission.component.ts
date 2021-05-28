import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { FeedApiCallsService } from 'src/app/services/feed-api-calls.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  identity; assignment_details

  constructor(private route : ActivatedRoute, private router : Router, private feed : FeedApiCallsService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.identity = params.id
    })
    //console.log(this.identity)
    await this.feed.get_assignment_details(this.identity).then((res) => {
      console.warn(res)
      this.assignment_details = res
    },(error) => {console.error(error)})
  }

  submissionForm = new FormGroup({
    sub_body : new FormControl('',[Validators.required]),
    ext_link_1 : new FormControl(''),
    ext_link_2 : new FormControl('')
  })

  async submissionSubmit(data){
    //console.warn(data, this.identity)
    await this.feed.post_submission(data, this.identity).then((res) => {
      //console.warn(res)
      this.router.navigateByUrl('forum/home', { skipLocationChange: true }).then(() => {
        // this.router.navigate(['views/show-post/'+this.identity]);
        this.router.navigate(['forum/feed']); //TODO : take assignment ref and collect the post id to redirected back to the post
      });
    },(error) => {console.error(error)})
  }
}
