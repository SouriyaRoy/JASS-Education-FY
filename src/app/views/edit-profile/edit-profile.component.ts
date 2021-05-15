import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  allDetails

  userDetails(){

  }

  EditSubmit(data){
    this.user.submit_user_profile_details(data)
  }

  profile_edit_form = new FormGroup({
    headline : new FormControl(),
    bio : new FormControl(),
    english : new FormControl(),
    github : new FormControl(),
    linkedin : new FormControl(),
    rollno : new FormControl(),
    user_since : new FormControl(),
  })

  constructor(private user : UserserviceService) {
    // user.getData().subscribe(result => {
    //   this.allDetails = result
    // })
    user.get_user_profile_details().subscribe((result) => {
      this.allDetails = result
    }, (error) => {
      alert("There is some error check console")
      console.error(error)
    })
   }

  ngOnInit(): void {
  }

}
