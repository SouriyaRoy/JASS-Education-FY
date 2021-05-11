import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private uauth_service : UserAuthService,
              private router : Router) {
    //router.navigateByUrl('admin-panel/admin-home')
    // uauth_service.check_admin().subscribe(result => {
    //   console.warn(result)
    // })
  }

  ngOnInit(): void {
  }

}
