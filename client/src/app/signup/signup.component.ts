import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  user: any;
  formInfo = {
    username: "",
    password: "",
    dni: ""
  };

  constructor(public sessionService: SessionService, public router: Router) {}

  ngOnInit() {}

  signup() {
    const user = {
      username: this.formInfo.username,
      password: this.formInfo.password,
      dni: this.formInfo.dni
    };
    console.log(user)
    this.sessionService
      .signup(user)
      .subscribe(() => this.router.navigate(["/auth/signup"]));
  }

  login() {
    this.sessionService
      .login(this.formInfo.username, this.formInfo.password)
      .subscribe(() => this.router.navigate(["/home"]));
  }
}
