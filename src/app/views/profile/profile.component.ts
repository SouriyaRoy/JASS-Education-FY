import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user_data

  constructor(private uauth : UserAuthService, private router : Router, private cookie : CookieService, private user : UserserviceService) { }

  async ngOnInit(): Promise<void> {
    this.user.get_user_profile_details().then((res) => {
      // console.warn(res)
      this.user_data = res
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
