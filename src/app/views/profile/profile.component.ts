import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiServ: AppService) { }

  

  user: User = <User>{};

  ngOnInit(): void {
    this.apiServ.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if(responseBody.data){
        this.user = responseBody.data;

        
      }
    })
  }

}
