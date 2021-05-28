import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FeedApiCallsService {
  [x: string]: any;

  //public cookieValue1 = this.cookie.get('Test')
  //public cookieValue2 = this.cookie.get('Role')

  post_url = 'http://ec2-52-66-137-123.ap-south-1.compute.amazonaws.com'//'21ed5cde83ca.ngrok.io'
  auth = 'lMyWq54TdEr2CwDoVQGZsAo0Nvekc2G7OgJZIosPrE3e9qJru57lUKUI4up6orny'

  asCoor = "13416989436929794359012690353783" //subjects under him
  asUser = "0"// all subjects enrolled

  public headers = new HttpHeaders()
  headers = this.headers.set('Authorization',"Token"+" "+this.auth)
                        .set('Content-Type',"application/json")
                        .set('Access-Control-Allow-Origin',"*") 

  async submit_assignment_teacher(title, marks, link1, link2) { //TODO :
    var api_call = {
      "body": title,
      "external_url_1": link1,
      "external_url_2": link2,
      "total_marks": marks
    }
    let json = JSON.stringify(api_call)
    let url = this.post_url+"/api/content/assignment/"
    console.warn(json)
    return await this.http.post(url, json,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async submit_lecture_teacher(description, link1, link2) { //TODO :
    var api_call = {
      "body": description,
      "external_url_1": link1,
      "external_url_2": link2
    }
    let json = JSON.stringify(api_call)
    let url = this.post_url+"/api/content/lecture/"
    console.warn(json)
    return await this.http.post(url, json,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
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
      "video_ref" : video_id,
  
      "forum_ref" : forum_id,
      "assignment_ref" : ass_id,
      "lecture_ref" : lec_id,
      "subject_ref" : subject_id,
                  
      "name" : title,
      "body" : description
    }

    let json = JSON.stringify(api)
    //console.log(json)
    let url = this.post_url+"/api/content/post/"
    return await this.http.post(url,json,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async get_feed(){ //TODO : feed as per the choice of enlisted subjects
    //console.warn("The cookieval2 is : " + this.cookieValue2)
    let url = ""
    if(this.cookie.get('Role') == 'Coor'){
      url = this.post_url+"/api/content/post/"+this.asCoor
    }else{
      url = this.post_url+"/api/content/post/"+this.asUser
    }
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async get_specific_post(id){ 
    //console.warn(id)
    let ass_id, lec_id, video_id, user_id, post_url, ass_url, lecture_url, video_url, user_url, post_details, ass_details, lec_details, video_details, user_details
    post_url = this.post_url+"/api/content/post/"+id;
    ass_url = this.post_url+"/api/content/assignment/"
    lecture_url = this.post_url+"/api/content/lecture/"
    video_url = this.post_url+"/api/content/video/"
    user_url = this.post_url+"/api/user/cred/"

    await this.http.get(post_url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise().then((post) => {
      post_details = post
      //console.warn(post_details)
      ass_id = post['data']['assignment_ref'];
      lec_id = post['data']['lecture_ref'];
      //video_id = post['data']['id'];
      user_id = post['data']['user_ref']
    }, (error) => {
      alert("Check console")
      console.error(error)
    })

    if(ass_id != null){
      //console.log("ass",ass_id)
      await this.http.get(ass_url+ass_id,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise().then((res1) => {
        ass_details = res1
        //console.warn(ass_details)
      }, (error) => {
        alert("Check console")
        console.error(error)
      })
    }
    
    if(lec_id != null){
      //console.log("lec",lec_id)
      await this.http.get(lecture_url+lec_id,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise().then((res2) => {
        lec_details = res2
        //console.warn(lec_details)
      }, (error) => {
        alert("Check console")
        console.error(error)
      })
    }
    
    // if(video_id != null){
    //   await this.http.get(video_url+video_id,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise().then((res3) => {
    //     lec_details = res3
    //   }, (error) => {
    //     alert("Check console")
    //     console.error(error)
    //   })
    // }

    if(user_id != null){
      //console.log("user",user_id)
      await this.http.get(user_url+user_id,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise().then((res4) => {
        user_details = res4
        //console.warn(user_details)
      }, (error) => {
        alert("Check console")
        console.error(error)
      })
    }

    return [post_details, ass_details, lec_details, user_details]
  }

  //OPTIMIZE : Reply post calls here

  async reply(data,id){ 
    let url = this.post_url+"/api/content/reply/"
    let api_call = {
      "forum_ref" : id,
      "body" : data.reply
  }
    let json = JSON.stringify(api_call)
    //console.log(json)
    return await this.http.post(url,json,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async reply_of_reply(data,id){
    let url = this.post_url+"/api/content/replyD/"
    let api_call = {
      "reply_ref" : id,
      "body" : data.replyofreply
    }
    let json = JSON.stringify(api_call)
    console.warn(json)
    return await this.http.post(url,json,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  //OPTIMIZE : Get calls down

  get_subjects(){ 
    //console.warn("The cookieval2 is : " + this.cookieValue2)
    let url = ""
    if(this.cookie.get('Role') == 'Coor'){ 
      url = this.post_url+"/api/content/subject/87795962440396049328460600526719"
    }else{
      url = this.post_url+"/api/content/subject/0"
    }
    return this.http.get(url, {headers: this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))})
  }

  async get_enrolled_subjects(){
    let url = this.post_url+"/api/personal/enroll/0"
    return await this.http.get(url , {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async get_specific_subject(id){
    let url = this.post_url+"/api/content/subject/"+id
    return await this.http.get(url, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async get_forum_id(data){
    let url = this.post_url+"/api/content/forum/"
    let api_call = {
      "forum_name" : data
    }
    let json = JSON.stringify(api_call)
    return await this.http.post(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async get_reply_id(forum_id){
    let url = this.post_url+"/api/content/forum/"+forum_id
    let replies = await this.http.get(url , {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
    return replies['data']['reply']
  }

  async get_replies(reply_id){
    let url = this.post_url+"/api/content/reply/"+reply_id
    return await this.http.get(url, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async get_replytoreply_id(reply_id){
    let url = this.post_url+"/api/content/reply/"+reply_id
    let ret = await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
    return ret['data']['reply2']
  }

  async get_replytoreply(replytoreply_id){
    let url = this.post_url+"/api/content/replyD/"+replytoreply_id
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async get_assignment_details(assignment_id){
    let url = this.post_url+"/api/content/assignment/"+assignment_id
    return await this.http.get(url, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  //OPTIMIZE : enroll/unenroll for a subject down here

  async enroll_for_subject(data){
    let url = this.post_url+"/api/personal/enroll/"
    let api_call = {
      "subject_ref" : data.subject_id
    }
    let json = JSON.stringify(api_call)
    console.warn(json)
    return await this.http.post(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async unenroll_subject(id){
    let url = this.post_url+"/api/personal/enroll/"+id
    return await this.http.delete(url, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  //OPTIMIZE : post calls down here

  async post_submission(data,assignment_id){
    let url = this.post_url+"/api/personal/submission//"
    if(data.ext_link_1 == ""){
      data.ext_link_1 = null
    }
    if(data.ext_link_2 == ""){
      data.ext_link_2 = null
    }
    let api_call = {
      "assignment_ref": assignment_id,
      "body": data.sub_body,
      "external_url_1": data.ext_link_1,
      "external_url_2": data.ext_link_2
    }
    let json = JSON.stringify(api_call)
    console.log(json)
    return await this.http.post(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
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
