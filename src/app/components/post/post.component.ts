import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posted: boolean = false;
  post: Post = <Post>{};

  constructor(private appServ: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  createPost(){
    this.appServ.createPost(this.post).subscribe(responseBody => {
      this.post = responseBody
      console.log(this.post); 
    })
  }
}
