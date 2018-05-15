import { Component, OnInit } from '@angular/core';
import { RequestService } from "../services/request.service";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-allPost',
  templateUrl: './allPost.component.html',
  styleUrls: ['./allPost.component.css'],
  providers: [RequestService]
})
export class AllPostComponent implements OnInit {
posts: Array<any>;

  constructor( public requestService: RequestService,
    public sessionService: SessionService,
    public router: Router) { 
      // this.requestService.getPostList().subscribe(posts => {
      //   this.posts = posts;
      // });
    }

  ngOnInit() {
    this.requestService.getPostList().subscribe(posts => {
      this.posts = posts;
    });
  }
getAllPosts(){
  this.requestService.getPostList().subscribe(posts => {
    this.posts = posts;
    console.log("hola")
  })
}
}
