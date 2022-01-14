import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  user: User = <User>{};
  

  constructor(private apiServ: AppService, private router: Router) { }

  ngOnInit(): void {}

  storeUser(){

    this.apiServ.checkSession().subscribe(responseBody => {
      this.apiServ.userProfile = responseBody.data;
      console.log("api user profile store in navbar")
      console.log(this.apiServ.userProfile);
    })
    this.router.navigate(["/profile"])
    /* await this.apiServ.storeUserSessionDTO();
    console.log("store user method in navbar")
    console.log(this.apiServ.userProfile);
    this.router.navigate(["/profile"]) */
  }

  logout(){
    this.apiServ.logout().subscribe(responseBody => {
      console.log(responseBody)
      this.router.navigate(["/"]);
    })
  }

}
