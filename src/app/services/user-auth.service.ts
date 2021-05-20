import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = '3644378a65e0.ngrok.io'
  auth = 'lMyWq54TdEr2CwDoVQGZsAo0Nvekc2G7OgJZIosPrE3e9qJru57lUKUI4up6orny'
  
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
    let ret = await this.http.post(url, json, {headers : headers}).toPromise()
    console.log(ret)

    if(ret['success']==true){
      var isAdmin = false; var isCoor = false
      this.cookie.set('Test',ret['data']['JWT'])
      await this.check_admin().then((result1) => {
        console.log(result1)
      if(result1['success'] == true){
        isAdmin = true
      }
    }, (error) => {console.error(error)}, )

    await this.check_coordinator().then((result2) => {
      console.log(result2)
      if(result2['success'] == true){
        isCoor = true
      }
    }, (error) => {console.error(error)})
    return [isAdmin, isCoor]
    }
  }

  async check_admin() {
    let url = 'https://'+this.api_url+'/api/admin/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    var response = await this.http.get(url, {headers:headers}).toPromise()
    console.log(response)
    return response
    //return { "success" : true }
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
    let url = 'https://'+this.api_url+'/api/content/coordinator/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    var response = await this.http.get(url, {headers:headers}).toPromise()
    console.log(response)
    return response
    //return { "success" : true }
  }
}

