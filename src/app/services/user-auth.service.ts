import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = '252ea2af87ca.ngrok.io'
  auth = 'E8QQ6sdv3iHwGnoufSKfOVzY5n7B6DPlJtN0OLXD9yO9JA46Mx0Ss3TMPwX675t7'

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

  async check_admin() {
    var isAdmin : boolean
    let url = 'https://'+this.api_url+'/api/admin/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookieValue)
    try{
      var response = await this.http.get(url, {headers:headers}).toPromise()
      console.log(response)
      return response
    }catch(e){
      console.log("Warning", e)
      return {"success": false}
    }   
  }

  get_user_data(){
    let url = 'https://'+this.api_url+'/api/user/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookieValue)
    return this.http.get(url,{headers:headers})
  }

  // check_coordinator_teacher(hash) {
  //   let api_call
  //   let json = JSON.stringify(api_call)
  //   return this.http.post(this.url,json)
  // }
}

