import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user_id

  constructor(private uauth_service : UserAuthService,
              private uservice : UserserviceService,
              private router : Router) {
    //router.navigateByUrl('admin-panel/admin-home')
    // uauth_service.check_admin().subscribe(result => {
    //   console.warn(result)
    // })
  }

  ticket_form = new FormGroup({
    contact : new FormControl('',[Validators.required, Validators.email]),
    request : new FormControl('',[Validators.required, Validators.minLength(2)]),
    req_type : new FormControl('',[Validators.required]),
  })

  RaiseTicket(data){
    //console.warn(data)
    this.uauth_service.get_user_data().subscribe((response) => {
      this.user_id = response['id']
    }, (error) => {
      console.warn(error)
    })

    //TODO:check if user is already an admin or a coordinator

    this.uservice.raise_ticket(data,this.user_id).subscribe((response) => {
      alert("Ticket Raised Successfully with number : "+response['docket'])
      this.router.navigateByUrl('forum/feed')
    }, (error) => {
      console.warn(error)
    })
  }

  ngOnInit(): void {
  }

  show_ticket(){
    let p = document.getElementById('ticket');
    p.removeAttribute('hidden');
  }
}
