import { Component, OnInit } from '@angular/core';
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

  unsolved_ticket_data
  public data1 = new Array()
  show_solved = 0
  solved_ticket_data
  public data2 = new Array()


  constructor(private uauth : UserAuthService, 
              private cookie : CookieService, 
              private router : Router,
              private admin : AdminService) { 
  }

  async ngOnInit(): Promise<void> {
    await this.admin.get_all_unsolved_tickets().then((res) => {
      console.warn(res['data'])
      this.unsolved_ticket_data = res['data']
      for(let i=0; i<this.unsolved_ticket_data.length; i++){
        this.uauth.get_specific_user_data(this.unsolved_ticket_data[i].user_ref).then((res2) => {
          this.unsolved_ticket_data[i].user_ref = res2['data']
          this.data1.push(this.unsolved_ticket_data[i])
        })
      }
    },(error) => {console.error(error)})
    console.warn(this.data1)
  }

  show_solved_tickets(){
    if(this.show_solved == 0){
      this.show_solved = 1
    }else if(this.show_solved == 1){
      this.show_solved = 0
    }
    this.data2 = []
    this.solved_ticket_data = null
    this.admin.get_all_solved_tickets().then((res) => {
      console.warn(res['data'])
      this.solved_ticket_data = res['data']
      for(let i=0; i<this.solved_ticket_data.length; i++){
        this.uauth.get_specific_user_data(this.solved_ticket_data[i].user_ref).then((res2) => {
          this.solved_ticket_data[i].user_ref = res2['data']
          this.data2.push(this.solved_ticket_data[i])
        })
      }
    },(error) => {console.error(error)})
    console.warn(this.data2)
  }

  opensweetalert(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover the data',
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

  Delete(id){
    Swal.fire({
      title: 'DELETE?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.admin.delete_ticket(id).then((res) => {
          console.warn(res)
          Swal.fire(
            'Deleted!',
            'The Ticket has been Deleted',
            'success'
          )
          this.router.navigateByUrl('admin-panel/admin-home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin-panel/tickets']);
        }); 
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'The operation is Cancelled',
          'error'
        )
      }
    })
  }

  MarkDone(id){
    Swal.fire({
      title: 'Mark as Done?',
      text: 'You will not be able to revert',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.admin.edit_ticket_solved(id).then((res) => {
          console.warn(res)
          Swal.fire(
            'DONE!',
            'The Ticket has been marked as Done',
            'success'
          )
          this.router.navigateByUrl('admin-panel/admin-home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin-panel/tickets']);
        }); 
        })
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
