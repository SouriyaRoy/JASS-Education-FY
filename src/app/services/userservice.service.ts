import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = 'http://jass.guru'//'21ed5cde83ca.ngrok.io'
  auth = 'sv6I4QY6jvj8WOkyohuGptgoRgQqxGaIri3GedcGzEmTS2GX58JlOiF5ybJPkLMM'

  send_registration_data(form_data){
    var api_call = {
      "action" : "signup",
      "data" : {
          "first_name": form_data.first_name,
          "middle_name": form_data.middle_name,
          "last_name": form_data.last_name,
          "email": form_data.email,
          "password": form_data.password,
          "telegram_id": null,
          "security_question": form_data.security_ques,
          "security_answer": form_data.security_ans,
          "profile_ref": null
      }
    }
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json")
    let json = JSON.stringify(api_call)
    let url = this.api_url+'/api/auth/user/cred/'
    return this.http.post(url,json,{headers : headers})
  }

  async get_user_profile_details(){
    let cookieValue = this.cookie.get('Test')
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")
    let url = this.api_url+'/api/auth/user/prof/0'
    return await this.http.get(url, {headers:headers}).toPromise()
  }

  async submit_user_profile_details(data,user_id){ //TODO : pass user id from user_cred
    let url = this.api_url+'/api/auth/user/prof/'+user_id
    var api_call = {
      "headline" : data.headline,
      "bio" : data.bio,
      "english_efficiency" : data.english,
      "git_profile" : data.github,
      "linkedin_profile" : data.linkedin,
      // "user_profile_pic" : null,
      "roll_number" : data.rollno,
      "prime" : true,
      "image_ref": null
    }
    let cookieValue = this.cookie.get('Test')
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")
    var json = JSON.stringify(api_call)
    console.log(json)
    return await this.http.put(url,json,{headers:headers}).toPromise() 
  }

  async create_user_profile(data){
    let url = this.api_url+'/api/auth/user/prof/'
    var api_call = {
      "headline" : data.headline,
      "bio" : data.bio,
      "english_efficiency" : data.english,
      "git_profile" : data.github,
      "image_ref" : null,
      "likedin_profile" : data.linkedin,
      "roll_number" : data.rollno,
      "prime" : true
    }
    let cookieValue = this.cookie.get('Test')
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")
    var json = JSON.stringify(api_call)
    console.log(json)
    return await this.http.post(url,json,{headers:headers}).toPromise() 
  }


  async raise_ticket(data){
    let url = this.api_url+'/api/analytics/ticket/'
    var api_call = {
      "body" : {
          "request":data.request, 
          "req_type":data.req_type
      }
    }
    var json = JSON.stringify(api_call)
    console.log(json)
    let cookieValue = this.cookie.get('Test')
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")
    return await this.http.post(url,json,{headers:headers}).toPromise()
  }

}
