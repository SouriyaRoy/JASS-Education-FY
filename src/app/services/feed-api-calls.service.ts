import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FeedApiCallsService {
  [x: string]: any;

  public cookieValue = this.cookie.get('Test')

  post_url = ''
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
    let url = "https://"+this.post_url+"/api/content/assignment/"

    console.warn(json)
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
    let url = "https://"+this.post_url+"/api/content/lecture/"

    console.warn(json)
    return this.http.post(url, json,{headers:this.headers})
  }



  post_submit(ass_id, lec_id, video_id, subject_id, forum_id,title,description){
    if(ass_id=="")
      ass_id=null;

    if(lec_id=="")
    lec_id=null;

    if(video_id=="")
    video_id=null;

    if(subject_id=="")
    subject_id=null;

    if(forum_id=="")
    forum_id=null;

    if(title=="")
    title=null;

    if(description=="")
    description=null;

    var api = {
      "video_id" : video_id,
  
      "forum_id" : forum_id,
      "assignment_id" : ass_id,
      "lecture_id" : lec_id,
      "subject_id" : subject_id,
                  
      "post_name" : title,
      "post_body" : description
    }

    let json = JSON.stringify(api)
    //console.log(json)
    let url = "https://"+this.post_url+"/api/content/post/"
    return this.http.post(url,json,{headers:this.headers})
  }


  get_feed(){ //TODO :
    let url = "https://"+this.post_url+"/api/content/post/0"
    return this.http.get(url,{headers:this.headers})
  }



  get_specific_post(id){ //TODO :
    let url = "https://"+this.post_url+"/api/content/post/read/"+id;
    return this.http.get(url,{headers:this.headers})
  }



  reply(data){ //TODO :
    let url = "https://"+this.post_url+"/api/content/reply/"
    let json = JSON.stringify(data)
    //console.log(json)
    return this.http.post(url,json,{headers:this.headers})
  }
















  


  getData() { //FIX: Delete this later
    let get_url = "https://jsonplaceholder.typicode.com/todos"
    return this.http.get(get_url)
  }

  constructor(private http: HttpClient, private cookie : CookieService) { }
}
