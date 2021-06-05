import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user_id

  constructor(private uauth : UserAuthService,
              private uservice : UserserviceService,
              private router : Router,
              private cookie : CookieService) {
  }

  ticket_form = new FormGroup({
    request : new FormControl('',[Validators.required, Validators.minLength(2)]),
    req_type : new FormControl('',[Validators.required]),
  })

  RaiseTicket(data){
    console.warn(data)
    this.uservice.raise_ticket(data).then((res) => {
      //console.log(res['data'])
      alert("Ticket Raised Successfully with number : " + res['data']['id'])
      this.router.navigateByUrl('forum/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['dashboard/admin']);
    }); 
    },(error) => {
      console.error(error)
    })
  }

  ngOnInit(): void {
  }

  show_ticket(){
    let p = document.getElementById('ticket');
    p.removeAttribute('hidden');
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
