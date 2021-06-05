import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FeedApiCallsService } from 'src/app/services/feed-api-calls.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-spec-assignment',
  templateUrl: './view-spec-assignment.component.html',
  styleUrls: ['./view-spec-assignment.component.css']
})
export class ViewSpecAssignmentComponent implements OnInit {

  identity; data;
  public view_data = new Array()

  constructor(private route : ActivatedRoute, private router : Router, private feed : FeedApiCallsService, private uauth : UserAuthService,
    private cookie : CookieService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.identity = params.id
    })
    //console.log(this.identity)
    this.feed.get_submissions_under_specific_assignment(this.identity).then((res) => {
      this.data = res['data']['submission']
      //console.log(this.data)
      for(let i=0; i<this.data.length; i++){
        //console.log(this.data[i].user_ref)
        this.uauth.get_specific_user_data(this.data[i].user_ref).then((res) => {
          this.data[i].user_ref = res['data']
          this.view_data.push(this.data[i])
        })
      }
      //console.warn(this.view_data)
    })

  }

  ViewSubmission(data){
    let student_marks
    Swal.fire({ //TODO : screen width 70%
      title: data.user_ref.first_name + " " + data.user_ref.last_name,
      text: data.body,
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Insert Marks',
      showLoaderOnConfirm: true,
      preConfirm: (mark) => {
        student_marks = mark
      },
      // allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        //console.warn(student_marks)
        this.feed.put_marks(data.assignment_ref, data.id, student_marks).then((res) => {
          //console.warn(res)
          this.router.navigateByUrl('forum/home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['courses/view/'+this.identity]);
        }); 
        })
      }else if (result.dismiss === Swal.DismissReason.cancel) {
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
        this.cookie.delete('Test')
        this.cookie.delete('Role')
        console.log("Successfully logged out")
      }
      this.router.navigateByUrl('forum/home')
    }, (error) => {
      console.error(error)
    })
  }
}
