import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  coor_data
  public coor_name = new Array()

  constructor(private admin : AdminService, private router : Router) { 
    admin.get_all_coors().then((res) => {
      this.coor_data = res['data']
      console.log(this.coor_data)
      for(let item of this.coor_data) //TODO : 2D array call(user_ref, user_name)
      {
        admin.get_user(item['coordinator']['user_ref']).then((res) => {
          //console.log(res)
          this.coor_name.push(res)
        },(error) => {console.error(error)})
      }
      console.warn(this.coor_name)
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
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  Delete(id){
    Swal.fire({
      title: 'Remove from Coordinator',
      text: 'You will not be able to revert!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //console.warn(id)
        this.admin.delete_coor_priv(id).then((res) => {
          console.warn(res)
          Swal.fire(
            'Privilege Removed',
            'The User is no longer a Coordinator',
            'success'
          )
          this.router.navigateByUrl('admin-panel/admin-home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin-panel/coordinators/list']);
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

}
