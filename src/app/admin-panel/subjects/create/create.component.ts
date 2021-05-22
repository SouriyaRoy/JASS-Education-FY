import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  subject_create = new FormGroup({
    subject_name : new FormControl('',[Validators.required]),
    subject_description : new FormControl('',[Validators.required])
  })

  constructor(private admin : AdminService, private router : Router) { 

  }

  subject(data){
    this.admin.create_subject(data).then((res) => {
      console.warn(res)
      this.router.navigateByUrl('admin-panel/admin-home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['admin-panel/subjects/view']);
      })
    }, (error) => {
      Swal.fire({
        title: 'Subject Already Exists',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Close'
      })
    })
  }




  ngOnInit(): void {
  }

}
