import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }

  url = ''
  auth = ''

  user_login(formdata) {
    let api_call = {
      "api": {
        "version": "1.0",
        "auth": this.auth
      },
      "data": {
        "action": "signin",
        "data": {
          "data": {
            "user_email": formdata.email,
            "user_password": formdata.password
          }
        }
      }
    }
    let json = JSON.stringify(api_call)
    return this.http.post(this.url, json)
  }

  check_admin(hash) {
    let api_call = {
      "api": {
        "version": "1.0",
        "auth": this.auth
      },
      "data": {
        "action": "read",
        "data": {
          "hash": hash,
        }
      }
    }
    let json = JSON.stringify(api_call)
    return this.http.post(this.url, json)
  }

  check_coordinator_teacher(hash) {
    let api_call = {
      "api": {
        "version": "1.0",
        "auth": this.auth
      },
      "data": {
        "action": "read",
        "data": {
          "hash": hash,
        }
      }
    }
    let json = JSON.stringify(api_call)
    return this.http.post(this.url,json)
  }
}
