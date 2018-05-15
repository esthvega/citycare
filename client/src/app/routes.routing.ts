import { Routes, RouterModule } from '@angular/router';
import { SessionService } from './services/session.service';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import {  LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { PostDetailComponent } from './postDetail/postDetail.component';
import { PostListComponent } from './postList/postList.component'
import { PostNewComponent } from './postNew/postNew.component';
import { AllPostComponent } from './allPost/allPost.component';



export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: PostListComponent//crear componente de home y hacer if para comprobar si esta loged y añadir la funcion de logout a signup//..
 },
  { path: "auth/signup", component: SignupComponent },
  { path: "auth/login", component: LoginComponent },
  { path: "post/detail/:id", component: PostDetailComponent},
  { path: "post/new", component: PostNewComponent },
  { path: "auth/private", component: UserProfileComponent},
  { path: "post/all", component: AllPostComponent}
];


 