import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient) { }

  api_url = '2e3c6397754a.ngrok.io'
  auth = 'MwNDjdPB4lJurP3EssDOJO56rhcUirJ5aW4iezSKNUGFCParIwhKhb8zz1UdVkYM'

  user_login(formdata) {
    let api_call = {
      "action" : "signin",
      "data" : {
          "email" : formdata.email,
          "password" : formdata.password
      }
    }
    let url = 'https://'+this.api_url+'/api/user/cred/'
    let json = JSON.stringify(api_call)

    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json")
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

