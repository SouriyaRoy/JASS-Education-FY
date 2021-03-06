import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedApiCallsService } from 'src/app/services/feed-api-calls.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  all_subjects; user; enrolled_subjects; 
  public show_subjects = new Array()


  constructor(private router : Router, private feed : FeedApiCallsService, private uauth : UserAuthService) { 
  }

  async ngOnInit(): Promise<void> {
    this.feed.get_subjects().subscribe((res) => {
      //console.log(res)
      this.all_subjects = res['data']
    },(error) => {console.error(error)})

    await this.uauth.get_user_data().then((res) => {
      console.log(res)
      this.user = res['data']
    },(error) => {console.error(error)})

    await this.feed.get_enrolled_subjects().then((res) => {
      //console.log(res)
      this.enrolled_subjects = res['data']['subject']
      for(let item of this.enrolled_subjects){
        this.feed.get_specific_subject(item).then((res)=> {
          this.show_subjects.push(res)
          //console.warn(this.show_subjects)
        },(error) => {console.error(error)})
      }
      console.log(this.show_subjects)
    },(error) => {console.error(error)})
  }

  enroll_subject = new FormGroup({
    subject_id : new FormControl()
  })

  async Add_subject(data){
    //console.log(data.subject_id)
    await this.feed.enroll_for_subject(data).then((res) => {
      this.router.navigateByUrl('forum/home', { skipLocationChange: true }).then(() => {
        this.router.navigate(['courses/enroll']);
    }); 
    },(error) => {
      Swal.fire(
        'Please Insert a Subject',
        'Insert a subject to enroll yourself',
        'info'
      )
    })
  }

  async DeleteSubject(subject_id){ //TODO : insert sweetalert for confirmation
    Swal.fire({
      title: 'DELETE?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value){
        this.feed.unenroll_subject(subject_id).then((res) => {
          this.router.navigateByUrl('forum/home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['courses/enroll']);
        }); 
        },(error) => {
          Swal.fire(
            'Cannot Delete the Subject',
            'Operation not Done',
            'info'
          )
        })
      }
    })
  }
}
