import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.sessionService.logout().subscribe(() => this.router.navigate(["/auth/signup"]))
  }
}
