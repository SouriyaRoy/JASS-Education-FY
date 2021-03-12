import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  getData(){

  }

  send_registration_data(form_data){
    //let post_url = " "
    let json = JSON.stringify(form_data)
    // let post_url = ''
    // return this.http.post(post_url,json)
    console.warn(json)
  }

  constructor() { }
}
