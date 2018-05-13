import { Component, OnInit } from "@angular/core";
import { RequestService } from "../services/request.service";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { google } from "@agm/core/services/google-maps-types";

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

  constructor(
    public requestService: RequestService,
    public sessionService: SessionService,
    public router: Router
  ) {}

  ngOnInit() {
    this.requestService.getPostList().subscribe(posts => {
      this.posts = posts;
      console.log(posts[0].location.coordinates)
      posts.forEach((post, i) => {
        this.markers.push({
          lat: posts[i].location.coordinates[0],
          lng: posts[i].location.coordinates[1]
        });
      } )
    
      // posts.forEach(post => {
      //   console.log("HOOOOOOLAAAAAAAAAAAA")
      //   const pin = new google.maps.Marker({
      //     position: {
      //       lat: post.location.coordinates[0],
      //       lng: post.location.coordinates[1]
      //     }
      //   })
      // })
    });
  }
  logout() {
    this.sessionService
      .logout()
      .subscribe(() => this.router.navigate(["/auth/signup"]));
  }
}

