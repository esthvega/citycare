import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formInfo = {
  username: "",
  password: ""
}
  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
  }
// login() {
//   this.sessionService.login(this.formInfo.username, this.formInfo.password).subscribe(()=> this.router.navigate(["/home"]))
// }
}
