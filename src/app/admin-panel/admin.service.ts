import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private cookie : CookieService, private http : HttpClient) { }

  public cookieValue1 = this.cookie.get('Test')
  public cookieValue2 = this.cookie.get('Role')

  post_url = 'a7510e54d810.ngrok.io'
  auth = 'nVB2UCs5b35BRLDI581k0ffq6F1wE4YLviMlIPPnwsmpTgRG9klgOYVYZQt942LS'

  asAdmin = "87795962440396049328460600526719"
  
  public headers = new HttpHeaders().set('Authorization',"Token"+" "+this.auth)
                                    .set('Content-Type',"application/json")
                                    .set('uauth',"Token"+" "+this.cookieValue1)
                                    .set('Access-Control-Allow-Origin',"*")

  async get_all_posts(){
    let url = "https://"+this.post_url+"/api/content/post/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers}).toPromise() 
  }

  async get_all_users(){
    let url = "https://"+this.post_url+"/api/user/prof/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers}).toPromise() 
  }

  async get_all_subjects(){
    let url = "https://"+this.post_url+"/api/content/subject/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers}).toPromise() 
  }

  async get_all_coors(){
    let url = "https://"+this.post_url+"/api/content/coordinator/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers}).toPromise() 
  }

  async get_all_tickets(){
    let url = "https://"+this.post_url+"/api/analytics/ticket/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers}).toPromise() 
  }

  async delete_post(id){

  }

  async delete_user(id){

  }
  
  async delete_subject(id){

  }

  async remove_coor_access(id){

  }
}
