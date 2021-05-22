import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = 'https://ec2-13-232-247-239.ap-south-1.compute.amazonaws.com'//'21ed5cde83ca.ngrok.io'
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
    let url = this.api_url+'/api/user/cred/'
    let json = JSON.stringify(api_call)
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json")
    let ret = await this.http.post(url, json, {headers : headers}).toPromise()
    console.log(ret)

    if(ret['success']==true){
      var check = 0
      this.cookie.set('Test',ret['data']['JWT'])
      await this.check_admin().then((result1) => {
        console.log(result1)
      if(result1['success'] == true){
        check++;
      }
    }, (error) => {console.error(error)}, )

    await this.check_coordinator().then((result2) => {
      console.log(result2)
      if(result2['success'] == true){
        check++
      }
    }, (error) => {console.error(error)})
    return check
    }
  }

  async check_admin() {
    let url = this.api_url+'/api/admin/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    var response = await this.http.get(url, {headers:headers}).toPromise()
    console.log(response)
    return response
    //return { "success" : true }
  }

  get_user_data(){
    let url = this.api_url+'/api/user/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    return this.http.get(url,{headers:headers})
  }


  async user_logout(){
    let url = this.api_url+'/api/user/cred/87795962440396049328460600526719'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    return await this.http.delete(url, {headers:headers}).toPromise()  
  }

  async check_coordinator(){
    let url = this.api_url+'/api/content/coordinator/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    var response = await this.http.get(url, {headers:headers}).toPromise()
    console.log(response)
    return response
    //return { "success" : true }
  }
}

