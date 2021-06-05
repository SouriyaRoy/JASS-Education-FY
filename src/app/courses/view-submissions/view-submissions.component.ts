import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FeedApiCallsService } from 'src/app/services/feed-api-calls.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.css']
})
export class ViewSubmissionsComponent implements OnInit {

  submission_data; isStudent : boolean; isCoor : boolean;
  public show_data = new Array()

  constructor(private feed : FeedApiCallsService, public cookie : CookieService, private uauth : UserAuthService, private router : Router) { }

  async ngOnInit(): Promise<void> {

    if(this.cookie.get('Role') == 'User'){
      this.isStudent = true
      this.submission_data = []
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
      this.submission_data = []
      this.feed.get_all_submissions().then((res) => {
        //console.warn(res)
        this.submission_data = res['data']
        //console.log(this.submission_data)
        for(let i=0; i<this.submission_data.length; i++){
          //console.log(this.submission_data[i].assignment)
          this.feed.get_assignment_details(this.submission_data[i].assignment).then((res2) => {
            this.submission_data[i].assignment = res2['data']
            // console.log(this.submission_data[i].assignment)
            this.show_data.push(this.submission_data[i].assignment)
            //console.warn(this.show_data)
          })
        }
        //console.warn(this.show_data)
        //this.isCoor = true
      })
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
