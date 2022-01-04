import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageLoginComponent } from './views/landing-page-login/landing-page-login.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  {path: 'createuser', component: LoginComponent},
  {path: "profile", component: ProfileComponent},
  {path: "", component: LandingPageLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
