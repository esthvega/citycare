import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { RequestService } from "../services/request.service";
import { FileUploader } from "ng2-file-upload";
import { ViewChild } from '@angular/core';

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
  @ViewChild('myInput')
  myInputVariable: any;
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
  postNew(resetForm) {
    console.log("JSHDFJFDLKJFLDGJ")
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('address', this.postInfo.address);
      form.append('subject', this.postInfo.subject);
      form.append('content', this.postInfo.content);
    };

    this.uploader.uploadAll()
     resetForm.reset()
     this.myInputVariable.nativeElement.value = "";
    // const file = document.querySelector('file');
    // file.id = '';
   
  
   
    // this.router.navigate(['/home'])
  }
  
}
     
