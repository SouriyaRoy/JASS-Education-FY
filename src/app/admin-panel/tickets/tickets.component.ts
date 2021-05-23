import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import Swal from'sweetalert2'
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  ticket_data
  split_data
  public data = new Array()

  constructor(private uauth : UserAuthService, 
              private cookie : CookieService, 
              private router : Router,
              private admin : AdminService) { 
  }

  async ngOnInit(): Promise<void> {
    await this.admin.get_all_tickets().then((res) => {
      this.ticket_data = res['data']
      for(let i of this.ticket_data){
        this.split_data = (i['body'].split("||"))
        //console.log(this.split_data)
        this.admin.get_user(this.split_data[0]).then((res) => {
          this.data.push(res)
        },(error) => {console.error(error)})
      }
    },(error) => {console.error(error)})
    //console.warn(this.data)
  }

  opensweetalert(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'All records has been deleted',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'The operation is Cancelled',
          'error'
        )
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
