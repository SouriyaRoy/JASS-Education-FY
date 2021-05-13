import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FeedApiCallsService {
  [x: string]: any;

  post_url = '252ea2af87ca.ngrok.io'
  auth = 'E8QQ6sdv3iHwGnoufSKfOVzY5n7B6DPlJtN0OLXD9yO9JA46Mx0Ss3TMPwX675t7'

  public cookieValue = this.cookie.get('Test')
    //console.warn(cookieValue)

  public headers = new HttpHeaders()
  headers = this.headers.set('Authorization',"Token"+" "+this.auth)
                        .set('Content-Type',"application/json")
                        .set('uauth',"Token"+" "+this.cookieValue)



  submit_assignment_teacher(title, description, link1, link2) { //TODO :

    var api_call = {
      "assignment_name": title,
      "assignment_body": description,
      "assignment_external_url_1": link1,
      "assignment_external_url_2": link2
    }
    let json = JSON.stringify(api_call)
    let url = "https://"+this.post_url+"/api/content/assignment/create/"

    //console.warn(api_call)
    return this.http.post(url, json,{headers:this.headers})
  }



  submit_lecture_teacher(title, description, link1, link2) { //TODO :

    var api_call = {
      "lecture_name": title,
      "lecture_body": description,
      "lecture_external_url_1": link1,
      "lecture_external_url_2": link2
    }
    let json = JSON.stringify(api_call)
    let url = "https://"+this.post_url+"/api/content/lecture/create/"

    //console.warn(api_call)
    return this.http.post(url, json,{headers:this.headers})
  }



  get_feed(){ //TODO :
    let url = "https://"+this.post_url+"/api/content/post/read/0"
    return this.http.get(url,{headers:this.headers})
  }



  get_specific_post(id){ //TODO :
    let url = "https://"+this.post_url+"/api/content/post/read/"+id;
    return this.http.get(url,{headers:this.headers})
  }



  reply(data){ //TODO :
    let url = "https://"+this.post_url+"/api/content/reply/create/"
    let json = JSON.stringify(data)
    //console.log(json)
    return this.http.post(url,json,{headers:this.headers})
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
