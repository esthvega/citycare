import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionService {
  user:any;
  userEvent: EventEmitter<any> = new EventEmitter();
  options: any = { withCredentials:true };
  BASEURL:string = "http://localhost:3000";

  constructor(private http: Http) { 
    this.isLoggedIn().subscribe();
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  handleUser(user?:object){
    this.user = user;
    this.userEvent.emit(this.user);
    return this.user;
  }

  signup(user) {
    return this.http.post(`${this.BASEURL}/auth/signup`, user, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  login(username, password) {
    return this.http.post(`${this.BASEURL}/auth/login`, {username, password}, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  logout() {
    return this.http.get(`${this.BASEURL}/auth/logout`, this.options)
    .map(() => this.handleUser())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${this.BASEURL}/auth/loggedin`,this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }
  getProfile(id) {
    return this.http.get(`${this.BASEURL}/auth/private/${id}`).map(res => res.json());
  }
  editPost(postId){
    console.log(this.user)
    return this.http.get(`${this.BASEURL}/post/edit/${postId}`, this.options).map(res => res.json());
  }
}