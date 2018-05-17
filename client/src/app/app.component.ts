import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { RequestService } from './services/request.service';
import { getDefaultService } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [SessionService]
})
export class AppComponent {
  title = 'app';
  formInfo = {
    username: "",
    password: ""
  }
// user: any;
error: string;
data: any;

constructor (private session: SessionService) {
//  this.isLoggedIn()
}

// signup() {
//   this.session.signup(this.formInfo)
//     .subscribe(
//       (user) => this.user = user,
//       (err) => this.error = err
//     );
// }

// login() {
//   this.session.login(this.formInfo.username, this.formInfo.password)
//     .subscribe(
//       (user) => {
//         this.user = user;
//         this.isLoggedIn()},
//       (err) => this.error = err,
//     );
// }

// isLoggedIn(){
//   this.session.isLoggedIn().subscribe(user=>this.user=user)
// }


// getPrivateData() {
//   this.session.getPrivateData()
//     .subscribe(
//       (data) => this.data = data,
//       (err) => this.error = err
//     );
// }

}

