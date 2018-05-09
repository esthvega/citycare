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
  BASEURL:string = "http://localhost:3000/auth";

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
    return this.http.post(`${this.BASEURL}/signup`, user, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  login(username, password) {
    return this.http.post(`${this.BASEURL}/login`, {username, password}, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  logout() {
    return this.http.get(`${this.BASEURL}/logout`, this.options)
    .map(() => this.handleUser())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${this.BASEURL}/loggedin`,this.options)
      .map(res => res.json())
      
      .catch(this.handleError);
  }


}