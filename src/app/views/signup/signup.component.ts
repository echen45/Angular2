import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from '../../models/User';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  message: string = "";
  user: User = <User>{};

  constructor(private appServ: AppService, private router: Router) { }

  ngOnInit(): void {
}

registerAccount(){
  this.appServ.registerAccount(this.user).subscribe({next: responseBody => {
    this.router.navigate(["/main"]);
  }, 
  error: badRequest => {
    this.message = badRequest.error.message;
  }});
}
}
