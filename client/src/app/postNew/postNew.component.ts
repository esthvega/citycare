import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { RequestService } from "../services/request.service";

@Component({
  selector: "app-postNew",
  templateUrl: "./postNew.component.html",
  styleUrls: ["./postNew.component.css"]
})
export class PostNewComponent implements OnInit {
  postInfo = {
    address: "",
    subject: "",
    content: "",
    photo: ""
  };

  constructor(
    public requestService: RequestService,
    public router: Router,
    public sessionService: SessionService
  ) {}

  ngOnInit() {}
  
  postNew() {
    this.requestService
      .postNew(this.postInfo)
      .subscribe(() => this.router.navigate(["/home"]));
  }
}
