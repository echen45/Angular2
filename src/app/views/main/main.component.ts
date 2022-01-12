import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Post } from '../../models/Post';
import { User } from '../../models/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  posted: boolean = false;
  post: Post = <Post>{};
  user: User = <User>{};
  posts: Array<Post> = [];

  constructor(private appServ: AppService, private router: Router) { }

  ngOnInit(): void {
    this.appServ.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if(responseBody.data){
        this.user = responseBody.data;  
        this.getAllPosts();
      }/* else{
        this.router.navigate(["/"])
      } */
    })
  }
  getAllPosts(){
    this.appServ.getAllPosts().subscribe(responseBody => {
        console.log(responseBody);
        this.posts = responseBody.data;
        this.posts.sort((a,b) => a.id - b.id);
    })
  }

  createPost(){
    this.appServ.createPost(this.post).subscribe(responseBody => {
      this.post = responseBody;
      console.log(this.post); 
    })
  }

  likepost(){
    this.appServ.likePost(this.post).subscribe(responseBody => {
      this.post = responseBody;
      console.log(this.post); 
    })
  }

  deletepost(){
    this.appServ.deletePost(this.post).subscribe(responseBody => {
      this.post = responseBody;
      console.log(this.post); 
    })
  }

  comment(){
    this.appServ.comment(this.post).subscribe(responseBody => {
      this.post = responseBody;
      console.log(this.post); 
    })
  }
  
}
