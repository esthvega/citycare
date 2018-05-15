import { Component, OnInit } from "@angular/core";
import { RequestService } from "../services/request.service";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-postDetail",
  templateUrl: "./postDetail.component.html",
  styleUrls: ["./postDetail.component.css"]
})
export class PostDetailComponent implements OnInit {
  post: any;
  constructor(
    public requestService: RequestService,
    public sessionService: SessionService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.requestService.getPost(params.id).subscribe(post => {
        (this.post = post), console.log(post);
      });
    });
  }
  editPost() {
    console.log("hola");
    this.sessionService
      .editPost(this.post._id)
      .subscribe(() => this.router.navigate(["/home"]));
  }

 }
