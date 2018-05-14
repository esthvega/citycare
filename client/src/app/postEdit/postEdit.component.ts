import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { SessionService } from "../services/session.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-postEdit',
  templateUrl: './postEdit.component.html',
  styleUrls: ['./postEdit.component.css']
})
export class PostEditComponent implements OnInit {
post: any
  constructor(public requestService: RequestService, public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
  }
// editPost(){
// this.requestService.editPost(this.post).subscribe(()=> this.router.navigate[('/home')])
// }
}
