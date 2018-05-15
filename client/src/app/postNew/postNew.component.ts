import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";
import { RequestService } from "../services/request.service";
import { FileUploader } from "ng2-file-upload";
import { ViewChild } from '@angular/core';
// import { PostListComponent } from '../postList/postList.component';
// import { componentRefresh } from "@angular/core/src/render3";

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
    photo: "",
  };
feedback: string;
  constructor(
    // public postListComponent: PostListComponent,
    public requestService: RequestService,
    public router: Router,
    public sessionService: SessionService
  ) {}

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      console.log(item);
      this.router.navigate(['/home'])
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
    }

    let promise = new Promise((res,rej)=>{
      this.uploader.uploadAll()
      resetForm.reset()
      this.myInputVariable.nativeElement.value = "";
     // const file = document.querySelector('file');
     // file.id = '';
    })

    
    
     promise.then(()=>{
       this.requestService.getPostList().subscribe((post) => {
      //console.log(post)
    })
     this.router.navigate(['/home'])
    })
     .catch(err=>console.log(err))
    //  this.requestService.getPostList()
    
    
    //  window.location.reload()
  }
  
}
     
