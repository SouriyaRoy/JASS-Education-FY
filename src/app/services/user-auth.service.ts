import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = 'a7510e54d810.ngrok.io'
  auth = 'nVB2UCs5b35BRLDI581k0ffq6F1wE4YLviMlIPPnwsmpTgRG9klgOYVYZQt942LS'
  
  isAdmin = false
  isCoor = false
  isUser = true

  public cookieValue = this.cookie.get('Test')

  async user_login(formdata) {
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
    let ret =  await this.http.post(url, json, {headers : headers}).toPromise()
    if(ret['success']==true){
      this.cookie.set('Test',ret['data']['JWT'])
    this.check_admin().then((result1) => {
      if(result1['success'] == true){
        this.isAdmin = true
      }
    }, (error) => {console.error(error)})
    this.check_coordinator().then((result2) => {
      if(result2['success'] == true){
        this.isCoor = true
      }
    }, (error) => {console.error(error)})
    }
    
    return [ret, this.isAdmin, this.isCoor, this.isUser]
  }

  async check_admin() {
    let url = 'https://'+this.api_url+'/api/admin/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookieValue)
    var response = await this.http.get(url, {headers:headers}).toPromise()
    console.log(response)
    return response
  }

  get_user_data(){
    let url = 'https://'+this.api_url+'/api/user/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookieValue)
    return this.http.get(url,{headers:headers})
  }


  async user_logout(){
    let url = 'https://'+this.api_url+'/api/user/cred/87795962440396049328460600526719'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookieValue)
    return await this.http.delete(url, {headers:headers}).toPromise()  
  }

  async check_coordinator(){
    let url = 'https://'+this.api_url+'/api/admin/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookieValue)
    var response = await this.http.get(url, {headers:headers}).toPromise()
    console.log(response)
    return response
  }

}

