import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { RequestService } from "../services/request.service";
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: "app-postNew",
  templateUrl: "./postNew.component.html",
  styleUrls: ["./postNew.component.css"]
})
export class PostNewComponent implements OnInit {
  BASEURL: string = "http://localhost:3000/post";
  uploader: FileUploader = new FileUploader ({   
    url: `${this.BASEURL}/new`
  });

  postInfo = {
    address: "",
    subject: "",
    content: "",
    photo: ""
  };
feedback: string;
  constructor(
    public requestService: RequestService,
    public router: Router,
    public sessionService: SessionService
  ) {}

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
        this.feedback = JSON.parse(response).message;
    };
 }
  postNew() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('address', this.postInfo.address);
      form.append('subject', this.postInfo.subject);
      form.append('content', this.postInfo.content);
    };

    this.uploader.uploadAll()
    this.router.navigate(['/home'])
  }
  
}
     
