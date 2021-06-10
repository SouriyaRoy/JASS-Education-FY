import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = 'http://jass.guru'//'21ed5cde83ca.ngrok.io'
  auth = 'sv6I4QY6jvj8WOkyohuGptgoRgQqxGaIri3GedcGzEmTS2GX58JlOiF5ybJPkLMM'
  
  public cookieValue = this.cookie.get('Test')

  async user_login(formdata) {
    let api_call = {
      "action" : "signin",
      "data" : {
          "email" : formdata.email,
          "password" : formdata.password
      }
    }
    let url = this.api_url+'/api/auth/user/cred/'
    let json = JSON.stringify(api_call)
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json")
    let ret = await this.http.post(url, json, {headers : headers}).toPromise()
    //console.log(ret)

    if(ret['success']==true){
      var check = 0
      this.cookie.set('Test',ret['data']['JWT'])
      await this.check_admin().then((result1) => {
        //console.log(result1)
      if(result1['success'] == true){
        check++;
      }
    }, (error) => {
      //console.error(error)
    })

    await this.check_coordinator().then((result2) => {
      //console.log(result2)
      if(result2['success'] == true){
        check++
      }
    }, (error) => {
      //console.error(error)
    })
    return check
    }
  }

  async check_admin() {
    let url = this.api_url+'/api/auth/admin/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    var response = await this.http.get(url, {headers:headers}).toPromise()
    console.log(response)
    return response
    //return { "success" : true }
  }

  async get_user_data(){
    let url = this.api_url+'/api/auth/user/cred/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    return await this.http.get(url,{headers:headers}).toPromise()
  }

  async get_specific_user_data(id){
    let url = this.api_url+'/api/auth/user/cred/'+id
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    return await this.http.get(url,{headers:headers}).toPromise()
  }

  async user_logout(){
    let url = this.api_url+'/api/auth/user/cred/87795962440396049328460600526719'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    return await this.http.delete(url, {headers:headers}).toPromise()  
  }

  async check_coordinator(){
    let url = this.api_url+'/api/content/coordinator/0'
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
    var response = await this.http.get(url, {headers:headers}).toPromise()
    //console.log(response)
    return response
    //return { "success" : true }
  }

  // async get_user(id){
  //   let url =this.api_url+"/api/user/cred/"+id
  //   let headers = new HttpHeaders()
  //   headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json").set('uauth',"Token"+" "+this.cookie.get('Test'))
  //   let ret = await this.http.get(url,{headers:headers}).toPromise()
  //   let full_name = ret['data']['first_name'] + " " + ret['data']['last_name']
  //   return full_name
  // }
}

