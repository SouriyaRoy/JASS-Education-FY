import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  identity
  subject_name
  subject_description

  edit_subject = new FormGroup({
    sub_name : new FormControl('',[Validators.required]),
    sub_desc : new FormControl('',[Validators.required])
  })

  async Edit(data){
    console.log(data)
    if((data.sub_name == "") && (data.sub_desc == "")){
      this.router.navigateByUrl('admin-panel/subjects/view')
    }else{
        let name = (data.sub_name == "")? this.subject_name : data.sub_name 
        let description = (data.sub_desc == "")? this.subject_description : data.sub_desc
        await this.admin.edit_subject(name, description, this.identity).then((res) => {
          this.router.navigateByUrl('admin-panel/admin-home', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin-panel/subjects/view']);
          })
       }, (error) => {console.error(error)})
    }
  }

  constructor(private admin : AdminService, private route : ActivatedRoute, private router : Router) { 
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.identity = params.id
      //console.log(this.identity)
    })

    await this.admin.get_subject(this.identity).then((res) => {
      //console.log(res)
      this.subject_name = res['data']['name']
      this.subject_description = res['data']['description']
      //console.log(this.subject_name)
    })

  }

}
