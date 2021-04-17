import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient) { }

  api_url = ''
  
  user_login(formdata) {
    let api_call = {
      "action" : "signin",
      "data" : {
          "email" : formdata.email,
          "password" : formdata.password
      }
    }
    let url = 'http://'+this.api_url+'/api/user/cred/create/'
    let json = JSON.stringify(api_call)
    return this.http.post(url, json)
  }

  // check_admin() {
  //   // let api_call 
  //   // let json = JSON.stringify(api_call)
  //   return this.http.get(this.url)
  // }

  // check_coordinator_teacher(hash) {
  //   let api_call
  //   let json = JSON.stringify(api_call)
  //   return this.http.post(this.url,json)
  // }
}

