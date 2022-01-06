import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageLoginComponent } from './views/landing-page-login/landing-page-login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { MainComponent } from './views/main/main.component';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  {path: 'create', component: SignupComponent},
  {path: "profile", component: ProfileComponent},
  {path: "", component: LandingPageLoginComponent},
  {path: "main", component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
