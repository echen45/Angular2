import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiServ: AppService, private router: Router) { }

  

  user: User = <User>{};

  posts: Array<Post> = [];

  ngOnInit(): void {
    this.apiServ.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if(responseBody.data){
        this.user = responseBody.data; 
        console.log(this.user)
        this.getAllPostsForAUser();
      }else{
        this.router.navigate(["/"])

      }
    })


  }

  
   updateUser(): void{
    this.apiServ.updateUser(this.user).subscribe({next:responseBody =>{
      window.location.reload()
      console.log(responseBody)

    }})
  }  

  getAllPostsForAUser(): void {
    this.apiServ.getAllPostsForAUser(this.user).subscribe(responseBody => {
      this.posts = responseBody
      console.log(this.posts)

    })
  }

}
