import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private http : HttpClient) { }

  post_url = ''

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
    let json = JSON.stringify(api_call)
    //let post_url = 'http://5b554f3fbd67.ngrok.io/api/user/user/'
    return this.http.post(this.post_url,json)
    //console.warn(json)
  }
}
