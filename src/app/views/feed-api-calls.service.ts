import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedApiCallsService {

  post_url = ''

  submit_assignment_teacher(title, description, link1, link2) {
    var api_call = {
      "assignment_name": title,
      "assignment_body": description,
      "assignment_external_url_1": link1,
      "assignment_external_url_2": link2
    }
    // let json = JSON.stringify(api_call)
    // return this.http.post(this.post_url, json)
    console.warn(api_call)
  }

  submit_lecture_teacher(title, description, link1, link2) {
    var api_call = {
      "lecture_name": title,
      "lecture_body": description,
      "lecture_external_url_1": link1,
      "lecture_external_url_2": link2
    }
    // let json = JSON.stringify(api_call)
    // return this.http.post(this.post_url, json)
    console.warn(api_call)
  }

  constructor(private http: HttpClient) { }
}
