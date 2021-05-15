import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private http : HttpClient, private cookie : CookieService) { }

  api_url = ''
  auth = 'E8QQ6sdv3iHwGnoufSKfOVzY5n7B6DPlJtN0OLXD9yO9JA46Mx0Ss3TMPwX675t7'

  send_registration_data(form_data){
    var api_call = {
      "action" : "signup",
      "data" : {
          "user_f_name" : form_data.first_name,
          "user_m_name" : form_data.middle_name,
          "user_l_name" : form_data.last_name,
          "user_email" : form_data.email,
          "user_password" : form_data.password,
          "user_security_question" : form_data.security_ques,
          "user_security_answer" : form_data.security_ans
      }
    }

    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('Content-Type',"application/json")

    let json = JSON.stringify(api_call)

    let url = 'https://'+this.api_url+'/api/user/cred/'

    return this.http.post(url,json,{headers : headers})
    //console.warn(json)
  }

  get_user_profile_details(){
    let cookieValue = this.cookie.get('Test')

    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")

    let url = 'https://'+this.api_url+'/api/user/prof/read/0'

    //console.warn(this.http.get(url, {headers:headers}))
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
    let url = 'https://'+this.api_url+'/api/analytics/ticket/'
    var api_call = { "ticket_body" : id+"||"+data.req_type+"||"+data.contact+"||"+data.request }
    var json = JSON.stringify(api_call)
    console.log(json)
    let cookieValue = this.cookie.get('Test')
    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth).set('uauth',"Token"+" "+cookieValue).set('Content-Type',"application/json")
    return this.http.post(url,json,{headers:headers})
  }

}
