import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  identity
  subject_array
  all_subjects
  user
  options

  opensweetalert(data){
    Swal.fire({
      title: 'DELETE?',
      text: 'Are you sure you want to remove this subject from this Coordinator?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.admin.edit_delete_subject_coor(data,this.identity).then((res) => {
          console.warn(res)
          Swal.fire(
            'Deleted!',
            'The Subject has been removed from the Coordinator',
            'success'
          )
          this.router.navigateByUrl('admin-panel/admin-home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin-panel/coordinators/edit/'+this.identity]);
        }); 
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Operation is cancelled',
          'error'
        )
      }
    })
  }

  coor_edit = new FormGroup({
    coor_name : new FormControl({value:'', disabled:true},[Validators.required]),
    subject_name : new FormControl('',[Validators.required])
  })

  constructor(private route : ActivatedRoute, private router : Router, private admin : AdminService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.identity = params.id
    })

    await this.admin.get_coor(this.identity).then((res) => {
      console.log("Coor Subject")
      this.subject_array = res['data']['subject'] //store the subjects of the given coordinator
      console.log(this.subject_array)
    })

    await this.admin.get_user(this.identity).then((res) => {
      this.user =res
      console.log(this.user)
    })

    await this.admin.get_all_subjects().then((res) =>{
      console.log("All Subjects")
      this.all_subjects = res['data']
      console.warn(this.all_subjects)
    })

  }

  async Edit(data){
    await this.admin.edit_coor(data, this.identity).then((res) => {
      console.warn(res)
      this.router.navigateByUrl('admin-panel/admin-home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['admin-panel/coordinators/edit/'+this.identity]);
    }); 
    },(error) => {
      Swal.fire({
        title: 'Subject Assigned',
        text: 'This subject is already assigned to '+ this.user,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Close'
      })
    })
  }
}

