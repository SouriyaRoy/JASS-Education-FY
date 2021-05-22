import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user_data

  constructor(private admin : AdminService, private router : Router) {
    admin.get_all_users().then((res) => {
      this.user_data = res['data']
    },(error) => {console.error(error)})
  }

  ngOnInit(): void {
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
        this.admin.delete_user(id).then((res) => {
          console.warn(res)
          Swal.fire(
            'Deleted!',
            'The User has been Deleted',
            'success'
          )
          this.router.navigateByUrl('admin-panel/admin-home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin-panel/user']);
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

  MakeAdmin(id){
    Swal.fire({
      title: 'Make Admin?',
      text: 'You will not be able to revert back',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.admin.make_admin(id).then((res) => {
          console.warn(res)
          Swal.fire(
            'Done!',
            'The User is now an Admin',
            'success'
          )
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
  
  MakeCoor(id){
    Swal.fire({
      title: 'Make Coordinator?',
      text: 'You will not be able to revert back',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.admin.make_coordinator(id).then((res) => {
          console.warn(res)
          Swal.fire(
            'Done!',
            'The User is now a Coordinator',
            'success'
          )
        }, (error) => {
          Swal.fire({
            title: 'User Already a Coordinator',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Close'
          })
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
}
