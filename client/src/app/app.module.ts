import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SessionService } from './services/session.service';
import { HttpModule } from '@angular/http';
import { routes } from './routes.routing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { PostDetailComponent } from './postDetail/postDetail.component';
import { RequestService } from './services/request.service';
import { PostListComponent } from './postList/postList.component';
import { PostNewComponent } from './postNew/postNew.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PrincipalComponent,
    UserProfileComponent,
    PostDetailComponent,
    PostListComponent,
    PostNewComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [SessionService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
