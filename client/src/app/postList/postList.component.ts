import { Component, OnInit } from '@angular/core';
import { RequestService} from '../services/request.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postList',
  templateUrl: './postList.component.html',
  styleUrls: ['./postList.component.css'],
  providers: [RequestService]
})
export class PostListComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = 40.938392;
  lng: number = -4.113233;
  zoom: number = 12;
posts: Array<any>;

  constructor(public requestService: RequestService, public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
    this.requestService.getPostList().subscribe(posts => {
      this.posts  = posts
    })
  }
  logout() {
    this.sessionService.logout().subscribe(() => this.router.navigate(["/auth/signup"]))
  }

}
