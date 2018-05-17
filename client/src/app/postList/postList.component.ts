import { Component, OnInit } from "@angular/core";
import { RequestService } from "../services/request.service";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { google } from "@agm/core/services/google-maps-types";
import { MouseEvent } from '@agm/core';


@Component({
  selector: "app-postList",
  templateUrl: "./postList.component.html",
  styleUrls: ["./postList.component.css"],
  providers: [RequestService]
})
export class PostListComponent implements OnInit {
  title: string = "My first AGM project";
  lat: number = 40.938392;
  lng: number = -4.113233;
  zoom: number = 12;
  posts: Array<any>;
  markers: Array<any> = [];
  date: any;

  constructor(
    public requestService: RequestService,
    public sessionService: SessionService,
    public router: Router
  ) {
    this.requestService.getPostList().subscribe(posts => {
      this.posts = posts;
      this.refreshPostList();
    });
  }

  ngOnInit() {
    this.requestService.getPostList().subscribe(posts => {
      this.posts = posts;
      posts.forEach((post, i) => {
        if (!post.isResolve) {
          // console.log(post);
          this.markers.push({
            subject: posts[i].subject,
            content: posts[i].content,
            id: posts[i]._id,
            lat: posts[i].location.coordinates[0],
            lng: posts[i].location.coordinates[1]
          });
        }
      });

      // console.log(this.markers,"HOLA MARKERS");
      this.posts.forEach((post, i) => {
        this;
      });
    });
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker`)
  }
// getAllPosts(){
//   this.requestService.getPostList().subscribe(posts => {
//     this.posts = posts;
//   })
// }

  logout() {
    this.sessionService
      .logout()
      .subscribe(() => this.router.navigate(["/auth/signup"]));
  }
  refreshPostList() {
    this.requestService.getPostList().subscribe(posts => (this.posts = posts));
  }
}
