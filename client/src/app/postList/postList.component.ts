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
      console.log(posts[0].location.coordinates);
      posts.forEach((post, i) => {
        this.markers.push({
          lat: posts[i].location.coordinates[0],
          lng: posts[i].location.coordinates[1]
        });
      });
    });
  }
  logout() {
    this.sessionService
      .logout()
      .subscribe(() => this.router.navigate(["/auth/signup"]));
  }
  // editPost(post) {
  //   this.requestService.editPost(post.id).subscribe(()=> this.router.navigate(["/home"]))
  // }
}

// postRoutes.put("/edit/:id", isAdmin, (req, res, next) => {
//   const postId = req.params.id;
//   console.log(postId)
//   Post.findByIdAndUpdate(postId,  {$set: {isResolve: true}}, function(err, post) 
//    {
//     if(err) {
//       return res.status(400).json({message: "Unable to update post", error: err})
//     }
//  res.json({message: 'post succesfully updated', post: post})
//    }
//   )})