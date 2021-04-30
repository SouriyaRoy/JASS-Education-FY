import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient) { }

  api_url = 'ec2-13-235-0-215.ap-south-1.compute.amazonaws.com'
  auth = '7vkteDTQL2idcPak9qBqwuFOapdZZxsKlkob4feTKtlV07ZRVcBXKKWaZ4c5025j'

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

    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth)

    return this.http.post(url, json, {headers : headers})
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

