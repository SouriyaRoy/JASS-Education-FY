import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FeedApiCallsService } from 'src/app/services/feed-api-calls.service';

@Component({
  selector: 'app-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.css']
})
export class ViewSubmissionsComponent implements OnInit {

  submission_data; isStudent : boolean; isCoor : boolean;

  constructor(private feed : FeedApiCallsService, public cookie : CookieService) { }

  async ngOnInit(): Promise<void> {

    if(this.cookie.get('Role') == 'User'){
      this.isStudent = true
      this.feed.get_all_submissions().then((res) => {
        this.submission_data = res['data']
        //console.warn(this.submission_data)
        for(let item of this.submission_data){
          //console.log(item['assignment_ref'])
          this.feed.get_assignment_details(item['assignment_ref']).then((res2) => {
            //console.warn(res2['data'])
            item['assignment_ref'] = res2['data']['assignment']
          })
        }
        console.log(this.submission_data)
      },(error) => {console.error(error)})

    }else if(this.cookie.get('Role') == 'Coor'){
      this.isCoor = true
      this.feed.get_all_submissions().then((res) => {
        console.warn(res)
        this.isCoor = true
      })
    }    
  }

}
