import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FeedApiCallsService {
  [x: string]: any;

  public cookieValue = this.cookie.get('Test')

  post_url = 'a7510e54d810.ngrok.io'
  auth = 'nVB2UCs5b35BRLDI581k0ffq6F1wE4YLviMlIPPnwsmpTgRG9klgOYVYZQt942LS'

  asAdmin = "87795962440396049328460600526719" //all posts
  asCoor = "13416989436929794359012690353783" //subjects under him
  asStudent = "0"// all subjects enrolled

  public cookieValue = this.cookie.get('Test')

  public headers = new HttpHeaders()
  headers = this.headers.set('Authorization',"Token"+" "+this.auth)
                        .set('Content-Type',"application/json")
                        .set('uauth',"Token"+" "+this.cookieValue)
                        .set('Access-Control-Allow-Origin',"*")

  async submit_assignment_teacher(title, description, link1, link2) { //TODO :

    var api_call = {
      "assignment_name": title,
      "assignment_body": description,
      "assignment_external_url_1": link1,
      "assignment_external_url_2": link2
    }
    let json = JSON.stringify(api_call)
    let url = "https://"+this.post_url+"/api/content/assignment/"

    console.warn(json)
    return await this.http.post(url, json,{headers:this.headers}).toPromise()
  }

  async submit_lecture_teacher(title, description, link1, link2) { //TODO :

    var api_call = {
      "lecture_name": title,
      "lecture_body": description,
      "lecture_external_url_1": link1,
      "lecture_external_url_2": link2
    }
    let json = JSON.stringify(api_call)
    let url = "https://"+this.post_url+"/api/content/lecture/"

    console.warn(json)
    return await this.http.post(url, json,{headers:this.headers}).toPromise()
  }

  async post_submit(ass_id, lec_id, video_id, subject_id, forum_id,title,description){
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
    return await this.http.post(url,json,{headers:this.headers}).toPromise()
  }

  async get_feed(){ //TODO :
    let url = "https://"+this.post_url+"/api/content/post/"+this.asCoor
    return await this.http.get(url,{headers:this.headers}).toPromise()
  }

  async get_specific_post(id){ 
    console.warn(id)

    let ass_id, lec_id, video_id, user_id, post_url, ass_url, lecture_url, video_url, user_url, post_details, ass_details, lec_details, video_details, user_details

    post_url = "https://"+this.post_url+"/api/content/post/"+id;
    ass_url = "https://"+this.post_url+"/api/content/assignment/"
    lecture_url = "https://"+this.post_url+"/api/content/lecture/"
    video_url = "https://"+this.post_url+"/api/content/video/"
    user_url = "https://"+this.post_url+"/api/user/cred/"

    await this.http.get(post_url,{headers:this.headers}).toPromise().then((post) => {
      post_details = post
      ass_id = post['data']['assignment_id'];
      lec_id = post['data']['lecture_id'];
      video_id = post['data']['video_id'];
      user_id = post['data']['user_credential_id']
    }, (error) => {
      alert("Check console")
      console.error(error)
    })

    if(ass_id != null){
      await this.http.get(ass_url+ass_id,{headers:this.headers}).toPromise().then((res1) => {
        ass_details = res1
      }, (error) => {
        alert("Check console")
        console.error(error)
      })
    }
    
    if(lec_id != null){
      await this.http.get(lecture_url+lec_id,{headers:this.headers}).toPromise().then((res2) => {
        lec_details = res2
      }, (error) => {
        alert("Check console")
        console.error(error)
      })
    }
    
    if(video_id != null){
      await this.http.get(video_url+video_id,{headers:this.headers}).toPromise().then((res3) => {
        lec_details = res3
      }, (error) => {
        alert("Check console")
        console.error(error)
      })
    }

    if(user_id != null){
      await this.http.get(user_url+user_id,{headers:this.headers}).toPromise().then((res4) => {
        user_details = res4
      }, (error) => {
        alert("Check console")
        console.error(error)
      })
    }

    return [post_details, ass_details, lec_details, video_details, user_details]
  }



  reply(data,id){ //TODO :
    let url = "https://"+this.post_url+"/api/content/reply/"
    let api_call = {
      "forum_id" : id,
      "reply_body" : data
  }
    let json = JSON.stringify(api_call)
    //console.log(json)
    return this.http.post(url,json,{headers:this.headers})
  }

  //TODO: Dynamic user data : student, admin, coordinator all have different get ids
  get_subjects(){
    let url = "https://"+this.post_url+"/api/content/subject/"+this.asCoor
    return this.http.get(url, {headers: this.headers})
  }


  async get_forum_id(data){
    let url = "https://"+this.post_url+"/api/content/forum/"
    let api_call = {
      "forum_name" : data
    }
    let json = JSON.stringify(api_call)
    return await this.http.post(url, json, {headers:this.headers}).toPromise()
  }











  




  
  async getData() { //FIX: Delete this later
    let get_url = "https://jsonplaceholder.typicode.com/posts"
    var ret =  await this.http.get(get_url).toPromise()
    console.warn(ret)
    return ret
  }
  async getspecificPost(id){
    let get_posturl = "https://jsonplaceholder.typicode.com/posts/"+id
    let get_commenturl = "https://jsonplaceholder.typicode.com/comments?postId="+id
    let post =  await this.http.get(get_posturl).toPromise()
    let comments = await this.http.get(get_commenturl).toPromise()
    return [post,comments]
  }
  async getreplies(id){
    let get_url = "https://jsonplaceholder.typicode.com/comments?postId="+id
    return await this.http.get(get_url).toPromise()
  }

  constructor(private http: HttpClient, private cookie : CookieService) { }
}
