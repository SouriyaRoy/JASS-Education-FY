import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'
import {Router} from '@angular/router'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  subject_data
  //description="Object-oriented programming (OOP) is a programming paradigm based on the concept of 'objects', which can contain data and code: data in the form of fields (often known as attributes or properties), and code, in the form of procedures (often known as methods).s"
 
  constructor(private admin : AdminService, private router : Router) {
    admin.get_all_subjects().then((res) => {
      this.subject_data = res['data']
    })
    //this.descriptionSplit();
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
        this.admin.delete_subject(id).then((res) => {
          console.warn(res)
          Swal.fire(
            'Deleted!',
            'The User has been Deleted',
            'success'
          )
          this.router.navigateByUrl('admin-panel/admin-home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin-panel/subjects/view']);
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

  
  ngOnInit(): void {
  }

  // descriptionSplit()//sample function to split string call this after getting data from backend.
  // {
  //   this.description=this.description.slice(0,20);
  //   console.log(this.description);
  // }
}
