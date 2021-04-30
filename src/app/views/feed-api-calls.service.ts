import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FeedApiCallsService {

  post_url = ''
  auth = ''




  submit_assignment_teacher(title, description, link1, link2) { //TODO :

    let cookieValue = this.cookie.get('Test')
    console.warn(cookieValue)

    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth)
                     .set('Content-Type',"application/json")
                     .set('uauth',"Token"+" "+cookieValue)

    var api_call = {
      "assignment_name": title,
      "assignment_body": description,
      "assignment_external_url_1": link1,
      "assignment_external_url_2": link2
    }
    let json = JSON.stringify(api_call)
    let url = "http://"+this.post_url+"/api/content/assignment/create/"

    //console.warn(api_call)
    return this.http.post(url, json,{headers:headers})
  }




  submit_lecture_teacher(title, description, link1, link2) { //TODO :

    let cookieValue = this.cookie.get('Test')
    console.warn(cookieValue)

    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth)
                     .set('Content-Type',"application/json")
                     .set('uauth',"Token"+" "+cookieValue)

    var api_call = {
      "lecture_name": title,
      "lecture_body": description,
      "lecture_external_url_1": link1,
      "lecture_external_url_2": link2
    }
    let json = JSON.stringify(api_call)
    let url = "http://"+this.post_url+"/api/content/lecture/create/"

    //console.warn(api_call)
    return this.http.post(url, json,{headers:headers})
  }



  get_feed(){ //TODO :
    let cookieValue = this.cookie.get('Test')
    console.warn(cookieValue)

    let headers = new HttpHeaders()
    headers = headers.set('Authorization',"Token"+" "+this.auth)
                     .set('Content-Type',"application/json")
                     .set('uauth',"Token"+" "+cookieValue)

    let url = "http://"+this.post_url+"/api/content/post/read/0"

    return this.http.get(url,{headers:headers})
  }




















  // search_youtube(key,search,max){
  //   console.log(key,max,search)
  //   let y_link = "https://www.googleapis.com/youtube/v3/search?key=" + key +
  //   "&type=video&part=snippet&resultsPerPage=" + max + "&q=" + search

  //   return this.http.get(y_link)
  // }


  getData() { //FIX: Delete this later
    let get_url = "https://jsonplaceholder.typicode.com/todos"
    return this.http.get(get_url)
  }

  constructor(private http: HttpClient, private cookie : CookieService) { }
}
