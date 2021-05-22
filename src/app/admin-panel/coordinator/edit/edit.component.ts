import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AdminService } from '../../admin.service';

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

  constructor(private route : ActivatedRoute, private router : Router, private admin : AdminService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.identity = params.id
      //console.log(this.identity)
    })

    await this.admin.get_coor(this.identity).then((res) => {
      console.log(res)
      this.subject_array = res['data']['subject']
    })

    await this.admin.get_user(this.identity).then((res) => {
      console.log(res)
      this.user =res['data']
    })

    await this.admin.get_all_subjects().then((res) =>{
      console.log(res)
      this.all_subjects = res['data']
    })

  }
}

