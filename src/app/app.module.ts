import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { ProfilepicComponent } from './components/profilepic/profilepic.component';
import { PostComponent } from './components/post/post.component';
import { LikebuttonComponent } from './components/likebutton/likebutton.component';
import { LikecounterComponent } from './components/likecounter/likecounter.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LandingPageLoginComponent } from './views/landing-page-login/landing-page-login.component';
import { LoginboxComponent } from './components/loginbox/loginbox.component';
import { ProfileboxComponent } from './profilebox/profilebox.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ButtonComponent,
    LoginComponent,
    MainComponent,
    ProfilepicComponent,
    PostComponent,
    LikebuttonComponent,
    LikecounterComponent,
    TextboxComponent,
    ProfileComponent,
    LandingPageLoginComponent,
    LoginboxComponent,
    ProfileboxComponent
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
