import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-landing-page-login',
  templateUrl: './landing-page-login.component.html',
  styleUrls: ['./landing-page-login.component.css']
})
export class LandingPageLoginComponent implements OnInit {

  constructor(private apiServ: AppService) { }

  isLoggedin: boolean = false;

  ngOnInit(): void {

    this.isLoggedin = false;

    console.log(this.isLoggedin)

    
  

}

}

