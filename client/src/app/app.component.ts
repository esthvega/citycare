import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { RequestService } from './services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  formInfo = {
    username: "",
    password: ""
  }
user: any;
error: string;
data: any;

constructor (private session: SessionService) {}

signup() {
  this.session.signup(this.formInfo)
    .subscribe(
      (user) => this.user = user,
      (err) => this.error = err
    );
}

login() {
  this.session.login(this.formInfo.username, this.formInfo.password)
    .subscribe(
      (user) => this.user = user,
      (err) => this.error = err
    );
}
// getPrivateData() {
//   this.session.getPrivateData()
//     .subscribe(
//       (data) => this.data = data,
//       (err) => this.error = err
//     );
// }

}

