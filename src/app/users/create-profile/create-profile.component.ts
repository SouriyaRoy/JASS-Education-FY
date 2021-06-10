import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  isCoor;

  constructor(private uauth : UserAuthService, private cookie : CookieService, private router : Router, private user : UserserviceService) { }

  async ngOnInit(): Promise<void> {
    if(this.cookie.get('Role') == 'Coor'){
      this.isCoor = true
    }
  }

  profile_form = new FormGroup({
    headline : new FormControl('',[Validators.required]),
    bio : new FormControl('',[Validators.required]),
    english : new FormControl('',[Validators.required]),
    github : new FormControl(''),
    linkedin : new FormControl(''),
    rollno : new FormControl('',[Validators.required, Validators.minLength(12)]),
    user_since : new FormControl(''),
  })

  ProfileSubmit(data){
    this.user.create_user_profile(data).then((res) => {
      // console.log(res)
      if(res['success'] == true){
        this.router.navigateByUrl('courses/enroll')
      }
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
