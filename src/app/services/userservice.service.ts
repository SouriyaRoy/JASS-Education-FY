import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = 'https://ec2-13-232-247-239.ap-south-1.compute.amazonaws.com'//'21ed5cde83ca.ngrok.io'
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

  get_user_profile_details(){
    let cookieValue = this.cookie.get('Test')
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")
    let url = this.api_url+'/api/user/prof/read/0'
    return this.http.get(url, {headers:headers})
  }

  submit_user_profile_details(data){
    let url = 'http://'+this.api_url+'/api/user/prof/edit/0'
    var api_call = {
      "user_profile_headline" : data.headline,
      "user_bio" : data.bio,
      "user_english_efficiency" : data.english,
      "user_git_profile" : data.github,
      "user_likedin_profile" : data.linkedin,
      "user_profile_pic" : null,
      "user_roll_number" : data.rollno,
      "prime" : true
    }
    let cookieValue = this.cookie.get('Test')
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")
    var json = JSON.stringify(api_call)
    return this.http.post(url,json,{headers:headers})
  }


  raise_ticket(data,id){
    let url = this.api_url+'/api/analytics/ticket/'
    var api_call = { "body" : id+"||"+data.req_type+"||"+data.request }
    var json = JSON.stringify(api_call)
    console.log(json)
    let cookieValue = this.cookie.get('Test')
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")
    return this.http.post(url,json,{headers:headers})
  }

}
