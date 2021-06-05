import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-teacher-coordinator',
  templateUrl: './teacher-coordinator.component.html',
  styleUrls: ['./teacher-coordinator.component.css']
})
export class TeacherCoordinatorComponent implements OnInit {

  constructor(private uauth : UserAuthService, private cookie : CookieService, private router : Router) { }

  ngOnInit(): void {
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
