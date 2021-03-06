import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private cookie : CookieService, private http : HttpClient) { }

  post_url = 'http://jass.guru'//'21ed5cde83ca.ngrok.io'
  auth = 'sv6I4QY6jvj8WOkyohuGptgoRgQqxGaIri3GedcGzEmTS2GX58JlOiF5ybJPkLMM'

  asAdmin = "87795962440396049328460600526719"
  
  public headers = new HttpHeaders().set('Authorization',"Token"+" "+this.auth)
                                    .set('Content-Type',"application/json")
                                    .set('Access-Control-Allow-Origin',"*")

  //OPTIMIZE : get_specific calls down

  async get_user(id){
    let url =this.post_url+"/api/auth/user/cred/"+id
    let ret = await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
    let full_name = ret['data']['first_name'] + " " + ret['data']['last_name']
    return full_name
  }

  async get_coor(id){
    let url = this.post_url+"/api/content/coordinator/"+id
    return await this.http.get(url, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async get_subject(id){
    let url = this.post_url+"/api/content/subject/"+id
    return await this.http.get(url, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  //OPTIMIZE: PUT calls down

  async edit_subject(name, description, id){
    //console.log(id,data)
    let url = this.post_url+"/api/content/subject/"+id
    let api_call = {
      "name" : name,
      "description" : description
    }
    let json = JSON.stringify(api_call)
    //console.log(json)
    return await this.http.put(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async edit_coor(data,id){
    let url = this.post_url+"/api/content/coordinator/"+id
    let api_call = {
      "subject_id" : data.subject_name
    }
    let json = JSON.stringify(api_call)
    //console.warn(data)
    return await this.http.put(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async edit_delete_subject_coor(data,id){
    let url = this.post_url+"/api/content/coordinator/"+id
    let api_call = {
      "subject_id" : -data
    }
    let json = JSON.stringify(api_call)
    //console.warn(data)
    return await this.http.put(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async edit_ticket_solved(id){
    let url = this.post_url+"/api/analytics/ticket/"+id
    let api_call = {
      "solved": true
    }
    let json = JSON.stringify(api_call)
    return await this.http.put(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  //OPTIMIZE : get_all calls down

  async get_all_posts(){
    let url = this.post_url+"/api/content/post/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async get_all_users(){
    let url = this.post_url+"/api/auth/user/cred/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async get_all_subjects(){
    let url = this.post_url+"/api/content/subject/0"
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async get_all_coors(){
    let url = this.post_url+"/api/content/coordinator/"+this.asAdmin
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async get_all_unsolved_tickets(){
    let url = this.post_url+"/api/analytics/ticket/87795962440396049328460600526719"
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  async get_all_solved_tickets(){
    let url = this.post_url+"/api/analytics/ticket/13416989436929794359012690353783"
    return await this.http.get(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise() 
  }

  //OPTIMIZE : make calls down

  async make_admin(id){ //make body
    let url = this.post_url+"/api/auth/admin/cred/"
    let api_call = {
      "user_id" : id
    }
    let json = JSON.stringify(api_call)
    return await this.http.post(url,json,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async make_coordinator(id){
    let url = this.post_url+"/api/content/coordinator/"
    let api_call = {
      "user_id" : id
    }
    let json = JSON.stringify(api_call)
    return await this.http.post(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }


//OPTIMIZE : delete calls down

  async delete_user(id){
    let url = this.post_url+"/api/auth/user/cred/"+id
    return await this.http.delete(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async delete_coor_priv(id){
    let url = this.post_url+"/api/content/coordinator/"+id
    return await this.http.delete(url,{headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async delete_subject(id){
    let url = this.post_url+"/api/content/subject/"+id
    return await this.http.delete(url, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }

  async delete_ticket(id){
    let url = this.post_url+"/api/analytics/ticket/"+id
    return await this.http.delete(url, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }


  //OPTIMIZE : create calls down

  async create_subject(data){
    let url = this.post_url+"/api/content/subject/"
    let api_call = {
      "name" : data.subject_name,
      "description" : data.subject_description
    }
    let json = JSON.stringify(api_call)
    return await this.http.post(url, json, {headers:this.headers.set('uauth',"Token"+" "+this.cookie.get('Test'))}).toPromise()
  }
}
