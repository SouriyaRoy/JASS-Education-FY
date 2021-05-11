import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = ''
  auth = ''

  public cookieValue = this.cookie.get('Test')

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

  check_admin() {
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookieValue)
    let api_call 
    let json = JSON.stringify(api_call)
    return this.http.get(this.api_url, {headers:headers})
  }

  // check_coordinator_teacher(hash) {
  //   let api_call
  //   let json = JSON.stringify(api_call)
  //   return this.http.post(this.url,json)
  // }
}

