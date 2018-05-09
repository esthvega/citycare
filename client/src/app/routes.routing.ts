import { Routes, RouterModule } from '@angular/router';
import { SessionService } from './services/session.service';
import { SignupComponent } from './signup/signup.component';
import { AppComponent } from './app.component';
import {  LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: PrincipalComponent//crear componente de home y hacer if para comprobar si esta loged y añadir la funcion de logout a signup//..
 },
  { path: "auth/signup", component: SignupComponent },
  { path: "auth/login", component: LoginComponent }
];


