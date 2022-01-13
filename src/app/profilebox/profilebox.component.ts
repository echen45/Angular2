import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-profilebox',
  templateUrl: './profilebox.component.html',
  styleUrls: ['./profilebox.component.css']
})
export class ProfileboxComponent implements OnInit {

  user: User = <User>{};

  constructor(private apiServ: AppService) { }

  ngOnInit(): void {
    this.user = this.apiServ.userProfile;
    console.log("profile box");
    console.log(this.apiServ.userProfile);
    console.log(this.apiServ.loggedInUserProfile);

    if(this.apiServ.userProfile.id){
      this.user = this.apiServ.userProfile;
      console.log("truthy value")
      
    
    }else{
      this.apiServ.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if(responseBody.data){
        this.user = responseBody.data; 
        console.log(this.user)
      }

    })
    }
    /* this.apiServ.checkSession().subscribe(responseBody => {
    
    if(responseBody.data){
      this.user = responseBody.data; 
    }
  })*/
  } 

}
