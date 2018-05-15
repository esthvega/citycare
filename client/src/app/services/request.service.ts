import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class RequestService {
  BASEURL: string = "http://localhost:3000/post";
  options: any = { withCredentials: true };

  constructor(private http: Http) {}
  user: any
  getPostList() {
    return this.http.get(`${this.BASEURL}`).map((res: Response) => res.json());
  }

  getPost(id) {
    return this.http.get(`${this.BASEURL}/detail/${id}`).map(res => res.json());
  }
  postNew(info) {
    return this.http.post(`${this.BASEURL}/new`, info, this.options).map(res=> res.json());
  }

  

  // editPost(postId){
  //   console.log(this.user)
  //   return this.http.get(`${this.BASEURL}/edit/${postId}`, this.options).map(res => res.json());
  // }
  // submit(info) {
  //   return this.http.post(`${this.BASEURL}/new`, info, this.options).map(res=> res.json());
  // }

}
