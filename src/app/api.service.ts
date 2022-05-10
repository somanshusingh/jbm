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
  constructor(private http: HttpClient) { }

  signin(url,post_data){
    // url = 'http://localhost:5000'+ url;
    url = "https://jbmapp.herokuapp.com" + url; 
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, JSON.stringify(post_data), { headers: headers });
  }
  uploadFile(url,post_data){
    // url = 'http://localhost:5000'+ url;
    url = "https://jbmapp.herokuapp.com" + url;
    return this.http.post(url,post_data);
  }
  signup(url,post_data){
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(url, JSON.stringify(post_data), { headers: headers });
  }
  getService(url){
    // url = 'http://localhost:5000'+ url;
    url = "https://jbmapp.herokuapp.com" + url; 
    return this.http.get(url);
  }
}
