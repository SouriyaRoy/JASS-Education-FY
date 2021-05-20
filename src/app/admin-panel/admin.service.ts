import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private cookie : CookieService, private http : HttpClient) { }

  post_url = '8b3ba7fc7573.ngrok.io'
  auth = 'lMyWq54TdEr2CwDoVQGZsAo0Nvekc2G7OgJZIosPrE3e9qJru57lUKUI4up6orny'

  asAdmin = "87795962440396049328460600526719"
  
  public headers = new HttpHeaders().set('Authorization',"Token"+" "+this.auth)
                                    .set('Content-Type',"application/json")
                                    .set('Access-Control-Allow-Origin',"*")

  async get_all_posts(){
    let url = "https://"+this.post_url+"/api/content/post/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async get_all_users(){
    let url = "https://"+this.post_url+"/api/user/cred/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async get_all_subjects(){
    let url = "https://"+this.post_url+"/api/content/subject/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async get_all_coors(){
    let url = "https://"+this.post_url+"/api/content/coordinator/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async get_all_tickets(){
    let url = "https://"+this.post_url+"/api/analytics/ticket/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async make_admin(id){ //make body
    let url = "https://"+this.post_url+"/api/admin/cred/"
    let api_call = {
      "user_id" : id
    }
    let json = JSON.stringify(api_call)
    return await this.http.post(url,json,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async delete_user(id){
    let url = "https://"+this.post_url+"/api/user/cred/"+id
    return await this.http.delete(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async make_coordinator(id){
    let url = "https://"+this.post_url+"/api/content/coordinator/"
    let api_call = {
      "user_id" : id
    }
    let json = JSON.stringify(api_call)
    return await this.http.post(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }
}
