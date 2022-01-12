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

  ngOnInit(): void {this.apiServ.checkSession().subscribe(responseBody => {
    
    if(responseBody.data){
      this.user = responseBody.data; 
    }
  })
  }

}
