import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user: User = <User>{};
  posts: Array<Post> = [];

  post: Post = <Post>{};

  domain: string = "http://localhost:9000"

  public imgInput: FileList = <FileList> {}

  constructor(private appServ: AppService, private router: Router, private httpCli: HttpClient) { }

  ngOnInit(): void {
    this.appServ.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if(responseBody.data){
        this.user = responseBody.data;  
        this.getAllPosts();
      }
    })
  }
  getAllPosts(){
    this.appServ.getAllPosts().subscribe(responseBody => {
        console.log(responseBody);
        this.posts = responseBody.data;
        this.posts.sort((a,b) => a.id - b.id);
    })
  }

  handleFileInput(event :any){

    this.imgInput = event.target.files;

  }

  createPost(): void{
    let file: File = this.imgInput[0];
    var formData: FormData = new FormData();
    formData.append("message", this.post.message);
    formData.append('file', file);
    formData.append("author", JSON.stringify(this.user.id));


    this.httpCli.post<any>(`${this.domain}/post`, formData).subscribe();

    console.log("post has been sent")
  }
}
