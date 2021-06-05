import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  allDetails; headline; bio; ee; gitlink; linkedlink; roll; user_since;

  userDetails(){

  }

  EditSubmit(data){
    this.user.submit_user_profile_details(data).then((res) => {
      console.log(res)
    })
  }

  profile_edit_form = new FormGroup({
    headline : new FormControl(''),
    bio : new FormControl(''),
    english : new FormControl(''),
    github : new FormControl(''),
    linkedin : new FormControl(''),
    rollno : new FormControl(''),
    user_since : new FormControl(''),
  })

  constructor(private user : UserserviceService, private uauth : UserAuthService, private cookie : CookieService, private router : Router) {
    // user.getData().subscribe(result => {
    //   this.allDetails = result
    // })
    user.get_user_profile_details().then((result) => {
      this.allDetails = result
      this.headline = result['data']['headline']
      this.bio = result['data']['bio']
      this.ee = result['data']['english_efficiency']
      this.gitlink = result['data']['git_profile']
      this.linkedlink = result['data']['linkedin_profile']
      this.roll = result['data']['roll_number']
      this.user_since = result['data']['made_date']
      console.warn(this.allDetails)
      console.warn(this.headline, this.bio, this.ee, this.gitlink, this.linkedlink, this.roll, this.user_since)
    }, (error) => {
      alert("There is some error check console")
      console.error(error)
    })
   }

  ngOnInit(): void {
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
