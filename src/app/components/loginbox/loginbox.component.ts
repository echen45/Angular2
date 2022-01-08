import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-loginbox',
  templateUrl: './loginbox.component.html',
  styleUrls: ['./loginbox.component.css']
})
export class LoginboxComponent implements OnInit {

  message: string ="";
  user: User = <User>{};

  constructor(private apiServ: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.apiServ.login(this.user).subscribe({next: responseBody => {
        console.log(responseBody)
        if(responseBody.data){
          this.router.navigate(["main"])

        }else{
          this.message = responseBody.message;
        
       this.router.navigate([""])


        }

        
    }, 
    error: badRequest => {
        this.message = badRequest.error.message;
    }})
  }

}
