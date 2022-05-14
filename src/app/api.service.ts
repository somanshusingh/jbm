import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Role;
  UserName ='';
  Allowed_Menu={};
  UserId='';
  Material=[];
  sessionID='';
  origin ="https://jbmapp.herokuapp.com";//"http://localhost:5000"
  constructor(private http: HttpClient) { }

  signin(url,post_data){
    url = this.origin + url; 
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, JSON.stringify(post_data), { headers: headers});
  }
  uploadFile(url,post_data){
    url = this.origin + url;
    return this.http.post(url,post_data);
  }
  getService(url){
    url = this.origin + url;
    return this.http.get(url);
  }
  getSession(url){
    url = this.origin + url;
    return this.http.get(url, {withCredentials:true});
  }
}
