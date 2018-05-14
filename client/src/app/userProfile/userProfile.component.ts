import { Component, OnInit } from "@angular/core";
import { RequestService } from "../services/request.service";
import { SessionService } from "../services/session.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-userProfile",
  templateUrl: "./userProfile.component.html",
  styleUrls: ["./userProfile.component.css"]
})
export class UserProfileComponent implements OnInit {
  user: any;
  posts: any;
  constructor(
    public requestService: RequestService,
    public sessionService: SessionService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.sessionService.getProfile(sessionService.user._id).subscribe(user => {
      this.user = user;
      console.log(user.isAdmin);
    });
  }

  ngOnInit() {}
}
