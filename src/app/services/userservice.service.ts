import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = 'http://ec2-52-66-137-123.ap-south-1.compute.amazonaws.com'//'21ed5cde83ca.ngrok.io'
  auth = 'lMyWq54TdEr2CwDoVQGZsAo0Nvekc2G7OgJZIosPrE3e9qJru57lUKUI4up6orny'

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
    let url = this.api_url+'/api/user/cred/'
    return this.http.post(url,json,{headers : headers})
  }

  async get_user_profile_details(){
    let cookieValue = this.cookie.get('Test')
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")
    let url = this.api_url+'/api/auth/user/prof/0'
    return await this.http.get(url, {headers:headers}).toPromise()
  }

  async submit_user_profile_details(data){ //TODO : pass user id from user_cred
    let url = 'http://'+this.api_url+'/api/auth/user/prof/'
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
    return await this.http.put(url,json,{headers:headers}).toPromise() //TODO : change to put and create post somewhere else
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
