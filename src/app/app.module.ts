import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { MainComponent } from './views/main/main.component';
import { PostComponent } from './components/post/post.component';
import { LikebuttonComponent } from './components/likebutton/likebutton.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LandingPageLoginComponent } from './views/landing-page-login/landing-page-login.component';
import { LoginboxComponent } from './components/loginbox/loginbox.component';
import { ProfileboxComponent } from './profilebox/profilebox.component';
import { CommentComponent } from './components/comment/comment.component';
import { SignupComponent } from './views/signup/signup.component';
import { ForgotpasswordmodalComponent } from './components/forgotpasswordmodal/forgotpasswordmodal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ButtonComponent,
    MainComponent,
    PostComponent,
    LikebuttonComponent,
    ProfileComponent,
    LandingPageLoginComponent,
    LoginboxComponent,
    ProfileboxComponent,
    CommentComponent,
    SignupComponent,
    ForgotpasswordmodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
